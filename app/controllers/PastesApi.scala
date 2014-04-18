package controllers

import models._
import play.api.mvc.Controller
import play.api.libs.json._
import play.api.libs.json.Json._
import play.api.db.slick._
import play.api.db.slick.Config.driver.simple._
import java.sql.Timestamp
import play.api.data.validation.ValidationError

object PastesApi extends Controller {

  implicit val timestampWrites = new Writes[Timestamp] {
    def writes(t: Timestamp): JsValue = toJson(t.getTime)
  }

  implicit val timestampReads = new Reads[Timestamp] {
    def reads(j: JsValue): JsResult[Timestamp] = j match {
      case JsNumber(d) => JsSuccess(new Timestamp(d.toLong))
      case _ => JsError(Seq(JsPath() -> Seq(ValidationError("error.expected.timestamp"))))
    }
  }

  implicit val pasteFormat = Json.format[Paste]

  val pastes = TableQuery[Pastes]

  def list(offset: Int, limit: Int) = DBAction { implicit rs =>
    Ok(toJson(pastes.filter(_.listed === true).sortBy(_.created.desc).drop(offset).take(limit).list))
  }

  def show(id: Int) = DBAction { implicit rs =>
    (for(p <- pastes if p.id === id) yield p).firstOption match {
      case Some(p) => Ok(toJson(p))
      case None => NotFound
    }
  }

  def create = DBAction(parse.json) { implicit rs =>
    (rs.request.body \ "text").validate[String] match {
      case s: JsSuccess[String] => {
        val title = (rs.request.body \ "title").validate[String].getOrElse("")
        val listed = (rs.request.body \ "listed").validate[Boolean].getOrElse(true)
        val id = (pastes.map(p => (p.text, p.title, p.listed)) returning pastes.map(_.id)) += (s.get, title, listed)
        Ok(Json.obj("id" -> id))
      }
      case e: JsError => BadRequest
    }
  }
}

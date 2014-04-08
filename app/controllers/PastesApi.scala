package controllers

import models._
import play.api.mvc.Controller
import play.api.libs.json.{JsSuccess, JsError, Json}
import play.api.libs.json.Json._
import play.api.db.slick._
import play.api.db.slick.Config.driver.simple._

object PastesApi extends Controller {
  implicit val pasteFormat = Json.format[Paste]
  val pastes = TableQuery[Pastes]

  def list = DBAction { implicit rs =>
    Ok(toJson(pastes.list))
  }

  def show(id :Int) = DBAction { implicit rs =>
    (for(p <- pastes if p.id === id) yield p).firstOption match {
      case Some(p) => Ok(toJson(p))
      case None => NotFound
    }
  }

  def create = DBAction(parse.json) { implicit rs =>
    (rs.request.body \ "text").validate[String] match {
      case s: JsSuccess[String] => {
        val id = (pastes.map(p => p.text) returning pastes.map(_.id)) += s.get
        Ok(Json.obj("id" -> id))
      }
      case e: JsError => BadRequest
    }
  }
}

package models

import play.api.db.slick.Config.driver.simple._
import java.sql.Timestamp

case class Paste(id: Int, text: String, title: String, listed: Boolean, created: Timestamp)

class Pastes(tag: Tag) extends Table[Paste](tag, "pastes") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def text = column[String]("text")
  def title = column[String]("title")
  def listed = column[Boolean]("listed")
  def created = column[Timestamp]("created")

  def * = (id, text, title, listed, created) <> (Paste.tupled, Paste.unapply)
}

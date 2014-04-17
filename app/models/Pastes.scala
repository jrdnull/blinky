package models

import play.api.db.slick.Config.driver.simple._
import java.sql.Timestamp

case class Paste(id: Int, text: String, title: String, created: Timestamp)

class Pastes(tag: Tag) extends Table[Paste](tag, "PASTES") {
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def text = column[String]("TEXT")
  def title = column[String]("TITLE")
  def created = column[Timestamp]("CREATED")

  def * = (id, text, title, created) <> (Paste.tupled, Paste.unapply)
}

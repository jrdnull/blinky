package models

import play.api.db.slick.Config.driver.simple._

case class Paste(id: Int, text: String, created: String)

class Pastes(tag: Tag) extends Table[Paste](tag, "PASTES") {
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def text = column[String]("TEXT")
  def created = column[String]("CREATED")

  def * = (id, text, created) <> (Paste.tupled, Paste.unapply)
}

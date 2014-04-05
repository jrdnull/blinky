import play.Project._

name := "blinky"

version := "0.1"

libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.2.1-2",
  "org.webjars" % "angularjs" % "1.2.15",
  "org.webjars" % "bootstrap" % "3.1.1"
)

playScalaSettings

import play.Project._

name := "blinky"

version := "0.1"

libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.2.1-2",
  "org.webjars" % "bootstrap" % "3.1.1",
  "org.webjars" % "angularjs" % "1.2.15",
  "org.webjars" % "angular-ui-router" % "0.2.8-2",
  "org.webjars" % "highlightjs" % "8.0-3",
  "com.typesafe.slick" %% "slick" % "2.0.1",
  "org.slf4j" % "slf4j-nop" % "1.6.4",
  "com.typesafe.play" %% "play-slick" % "0.6.0.1",
  "postgresql" % "postgresql" % "9.1-901-1.jdbc4"
)

playScalaSettings

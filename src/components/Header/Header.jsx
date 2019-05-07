import React from "react";

export default function Header() {
  return (
    <div className="header__wrapper">
      <a href="#" className="header__logo">
        <img src="https://news.ycombinator.com/y18.gif" alt="YC logo" />
      </a>
      <p className="header__link header__home">Hacker News</p>
      <p className="header__link header__new">new</p>
      <p className="header__link header__past">past</p>
      <p className="header__link header__comments">comments</p>
      <p className="header__link header__ask">ask</p>
      <p className="header__link header__show">show</p>
      <p className="header__link header__jobs">jobs</p>
      <p className="header__link header__submit">submit</p>
    </div>
  );
}

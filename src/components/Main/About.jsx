import React from "react";
import "../../pages/About/AboutPage.css";

/* Multi idioma */
import { FormattedMessage } from "react-intl";

const About = () => (
  <section className="sobre-mi" id="sobre-mi">
    <h2 className="heading">
      <FormattedMessage id="about" defaultMessage="About me" />
    </h2>

    <div className="row container">
      <div className="columns" data-aos="fade-right" data-aos-delay="300">
        <h3>Introduction </h3>
        <p>
          <FormattedMessage
            id="my-description"
            defaultMessage="Hi friends! My name is Jeremiah and my passion is to develop software applications that make the world a better place to live in. I am open to work and looking for my next developer job! Some projects I recently completed include developing an e-commerce application and an interactive Quiz app using React.
                         I’m currently developing an application for a car rental company called Aldo to increase its reach and customer base.

                     For several months now I have been working remotely with different people across the globe on unique real-world projects. I have fallen in love with pair programming and solving DSA problems for fun. I love playing video games and having fun with friends and family."
          />
        </p>
      </div>
      <div
        className="columns col-skill"
        data-aos="fade-left"
        data-aos-delay="650"
      >
        <h3>skills</h3>
        <h4>Front-End</h4>
        <div className="skill">
          <div>
            <img
              alt="HTML"
              className="icons-skils"
              src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
            />
            <h5>HTML</h5>
          </div>
          <div>
            <img
              alt="CSS"
              className="icons-skils"
              src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
            />
            <h5>CSS</h5>
          </div>
          <div>
            <img
              alt="Js"
              className="icons-skils"
              src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg"
            />
            <h5>JavaScript</h5>
          </div>
          <div>
            <img
              alt="Sass"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"
            />
            <h5>Sass</h5>
          </div>
          <div>
            <img
              alt="Bootstrap"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
            />
            <h5>Bootstrap</h5>
          </div>
          <div>
            <img
              alt="Tailwindcss"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
            />
            <h5>Tailwindcss</h5>
          </div>
          <div>
            <img
              alt="jQuery"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-plain-wordmark.svg"
            />
            <h5>jQuery</h5>
          </div>
          <div>
            <img
              alt="React"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            />
            <h5>React</h5>
          </div>
          <div>
            <img
              alt="Typescript"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
            />
            <h5>Typescript</h5>
          </div>
        </div>
        <h4>Back-End</h4>
        <div className="skill">
          <div>
            <img
              alt="Nodejs"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
            />
            <h5>NodeJs</h5>
          </div>
          <div>
            <img
              alt="mongodb"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg"
            />
            <h5>MongodDB</h5>
          </div>
          <div>
            <img
              alt="php"
              className="icons-skils"
              src="https://cdn.icon-icons.com/icons2/2415/PNG/512/rails_plain_logo_icon_146376.png"
            />
            <h5>Rails</h5>
          </div>
        </div>
        <h4>
          <FormattedMessage id="tools" defaultMessage="Tools" />
        </h4>
        <div className="skill">
          <div>
            <img
              alt="figma"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
              title="figma"
            />
            <h5>Figma</h5>
          </div>
          <div>
            <img
              alt="photoshop"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg"
              title="Photoshop"
            />
            <h5>Photoshop</h5>
          </div>
          <div>
            <img
              alt="Visual Studio Code"
              className="icons-skils"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Visual_Studio_Code_1.18_icon.svg/1200px-Visual_Studio_Code_1.18_icon.svg.png"
              title="Visual Studio Code"
            />
            <h5>VS Code</h5>
          </div>
          <div>
            <img
              alt="git"
              className="icons-skils"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
              title="git"
            />
            <h5>Git</h5>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default React.memo(About);

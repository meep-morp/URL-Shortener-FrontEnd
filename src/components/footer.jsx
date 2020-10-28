import React from "react";
import { BookFilled, GithubFilled, LinkedinFilled } from "@ant-design/icons";

const Footer = () => {
    return (
        <footer>
            <div className="links">
                <a href="https://github.com/meep-morp" target="_blank" rel="noopener noreferrer">
                    <GithubFilled className="link" />
                </a>
                <a href="https://www.linkedin.com/in/hannah-adrian-hartley/" target="_blank" rel="noopener noreferrer">
                    <LinkedinFilled className="link" />
                </a>
                <a href="https://meep-morp.com/" target="_blank" rel="noopener noreferrer">
                    <BookFilled className="link" />
                </a>
            </div>
            <section className="about">
                <h2>Hannah Hartley</h2>
                <h3>Full Stack Web Dev</h3>
            </section>
        </footer>
    );
};

export default Footer;
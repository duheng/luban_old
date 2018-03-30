import React, {Component} from "react"
import {Link} from "react-router-dom"
import style from "./style"

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Link to="/about" className="about">
                    点击进下一页
                </Link>
            </div>
        )
    }
}

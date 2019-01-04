import React, {Component} from "react"
import {Link} from "react-router-dom"
import connect from 'app/store/connect'
import style from "./style"
import HomeSelector from 'app/selectors/home'
import * as HomeActions from 'app/actions/home'

@connect(HomeSelector,HomeActions)
export default class Home extends Component {
  constructor(...args) {
     super(...args)
     this.state = {}

  }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //   //会在初始化和update时触发，用于替换componentWillReceiveProps，
    //   //可以用来控制 props 更新 state 的过程；它返回一个对象表示新的 state；
    //   //如果不需要更新，返回 null 即可
    //   return null
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //   return false
    // }
    // getSnapshotBeforeUpdate() {
    //   // 组件即将销毁
    //  // 可以在此处移除订阅，定时器等等
    // }
    componentDidMount() {
      const { actions } = this.props
      actions.fetchMovies()
      console.log(this.props)
    }
    render() {
          console.log('home-render---',this.props.home.movies)
        return (
            <div className="Home">
                <Link to="/about" className="about">
                    点击进下一页
                </Link>
            </div>
        )
    }
}

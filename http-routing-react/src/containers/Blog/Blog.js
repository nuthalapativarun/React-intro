import React, { Component, Suspense } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import { Route, NavLink, Switch } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';

//Can use inplace of React.lazy()
// const AsyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// })

const NewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    }
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {/* {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null} */}
                    {this.state.auth ? <Route path="/new-post" render={() => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <NewPost />
                        </Suspense>
                    )} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not found</h1>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;
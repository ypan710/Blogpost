import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PostForm from './components/PostForm';
import Message from './components/Message';
import SimpleStorage from "react-simple-storage";
import Login from "./components/Login";


// class components have life cycle and state; functional components do not have state
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            message: null,
            isAuthenticated: false,
        };
    }

    // get new slug from title 
    getNewSlugFromTitle  = (title) => {
        encodeURIComponent(
          title
        .toLowerCase()
        .split(" ")
        .join("-"));
    }

    // add new post
    addNewPost = (post) => {
        this.props.appService.savePost(post);
        this.displayMessage("saved");
    }

    // update post
    updatePost = (post) => {
      this.props.appService.updatePost(post);
      this.displayMessage("updated");
    }

    // delete post
    deletePost = (post) => {
      if (window.confirm("Delete this post?")){
        // filter the posts in state to get all posts that 
        // do not have id of the post to delete
        this.props.appService.deletePost(post);
        this.displayMessage("deleted");
    }
  }

    // login and authenticate with firebase
    // email and password entered must match
    // email and password from set up in firebase
    onLogin = (email, password) => {
      this.props.appService
        .login(email, password)
        .then(user => {this.setState({ isAuthenticated: true })
       })
        .catch(error => console.error(error))
    }

    onLogout = () => {
      this.props.appService
      .logout()
      .then(() => {
          this.setState({ isAuthenticated: false });
        })
        .catch(error => console.error(error));
    }

    componentDidMount() {
      this.props.appService
        .subscribeToPosts(posts => this.setState({
          posts
        }));
    }

    displayMessage = (type) => {
      this.setState({ message: type });
      setTimeout(() => {
        this.setState({ message: null });
      }, 1600);
    }

    // check if user is authenticated,
    // if so, load the desired component
    // if not, redirect them home
    renderAuthRoute = (Component, props) => (
      this.state.isAuthenticated ? (
        <Component {...props} />
        ) : <Redirect to="/" />
    )
    
    render() {
        return(
            <div className="App">
              <BrowserRouter>
                <SimpleStorage parent={this} />
                <Header 
                isAuthenticated={this.state.isAuthenticated}
                onLogout={this.onLogout} 
                />
                {this.state.message && (
                  <Message type={this.state.message} />
                )}
                
                {this.state.message && <Message type={this.state.message} />} 
                <Switch>
                    <Route 
                          exact path="/" 
                          render={() => <Posts 
                            isAuthenticated={this.state.isAuthenticated} 
                            posts={this.state.posts} 
                            deletePost={this.deletePost} />}
                         />
                    <Route 
                          path="/post/:postSlug"  
                          render={props => {     
                            const post = this.state.posts.find(
                              post => post.slug === props.match.params.postSlug
                            ); 
                            if (post && this.state.isAuthenticated) {
                              return <PostForm updatePost={this.updatePost}
                              post={post} 
                            />;
                            }
                            else if (post && !this.state.isAuthenticated) {
                              return <Redirect to="/login" />
                            }
                            else {
                              return <Redirect to="/" />; 
                            }
                          }} 
                         />
                    <Route
                          exact path="/new"
                          render={()=> 
                            this.renderAuthRoute(PostForm, {
                              addNewPost: this.addNewPost,
                              post: {
                                key: null,
                                slug: "",
                                title: "", 
                                content: ""
                              }
                            })
                          }
                        />
                    <Route
                          path="/edit/:postSlug"
                          render={props => {
                            const post = this.state.posts.find(
                              post => post.slug === props.match.params.postSlug
                            );
                            if (post) {
                              return this.renderAuthRoute(PostForm, 
                                {updatePost: this.updatePost,
                                 post 
                              });
                            }
                            else {
                              return <Redirect to="/" />
                            }
                          }
                        }
                      />
                    <Route
                        exact
                        path="/login"
                        render ={() =>
                          !this.state.isAuthenticated ? (
                        <Login onLogin={this.onLogin} />
                          ) : (
                            <Redirect to="/" />
                          )
                        }
                    />
                </Switch>
                </BrowserRouter>
                APP HERE
            </div>
        );
      }
  }

        
export default App;

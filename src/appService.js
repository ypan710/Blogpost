import firebase from "./firebase";

export default new class AppService {

    login(email, password) {
        return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
    }

    logout() {
        return firebase
        .auth()
        .signOut()
    }

    subscribeToPosts(callback) {
        firebase.database().ref("pages").on("value", snapshot => {
            const posts = snapshot.val();
            const newStatePosts = [];
            for (let post in posts) {
                newStatePosts.push({
                    key: post,
                    slug: posts[post].slug,
                    title: posts[post].title,
                    content: posts[post].content
            });
        };
        callback(newStatePosts);
        });
    }

    getNewSlugFromTitle = (title) => {
        return encodeURIComponent(
            title
            .toLowerCase()
            .split(" ")
            .join("-")
        );
    }

    savePost (post) {
        return firebase.database().ref("pages").push({
            ...post,
            slug: this.getNewSlugFromTitle(post.title)
        })
    }

    deletePost = (post) => {
        return firebase.database().ref(`pages/${post.key}`)
        .remove()
    }

    updatePost = (post) => {
        return firebase.database().ref(`pages/${post.key}`)
        .update({
            title: post.title,
            slug: this.getNewSlugFromTitle(post.title),
            content: post.content
        })
    }
}()

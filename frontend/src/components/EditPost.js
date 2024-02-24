import { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Loading from './Loading';
import API from '../API';
import PostForm from './PostForm';

function EditPost() {
  const { user, httpClient, isSessionExpired, logout } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const post = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    if (!user) {
      // User not logged in
      navigate('/login');
      return;
    }

    isSessionExpired()
      .then(expired => {
        if (expired) {
          // Session expired
          logout();
          navigate('/login');
          throw new Error('Session expired');
        }
        return expired;
      })
      .then((expired) => {
        if (expired) {
          return;
        }

        // User logged in
        if (id) {
          httpClient.get(`${API.POST}/${id}`)
            .then(response => {
              post.current = response.data;
              if (user.id !== post.current.user.id) {
                // User isn't the author
                navigate('/');
                throw new Error('User is not the author');
              }
              setIsLoading(false);
            })
            .catch(error => {
              if (error.response && error.response.status === 404) {
                // Post not found
                navigate('/');
                throw new Error('Post not found');
              } else {
                // Handle other errors
                console.error(error);
                throw new Error('Error fetching post');
              }
            });
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        // Handle errors from the entire chain
        console.error(error);
      });
  }, [user, id, navigate, isSessionExpired, logout, httpClient]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <PostForm id={id} post={post} />
        </div>
      </div>
    </div>
  );
}

export default EditPost;

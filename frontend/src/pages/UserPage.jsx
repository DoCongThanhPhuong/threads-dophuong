import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import postsAtom from '~/atoms/postAtom'
import Post from '~/components/Post'
import UserHeader from '~/components/UserHeader'
import useGetUserProfile from '~/hooks/useGetUserProfile'
import useShowToast from '~/hooks/useShowToast'

function UserPage() {
  const { user, loading } = useGetUserProfile()
  const { username } = useParams()
  const showToast = useShowToast()
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [fetchingPosts, setFetchingPosts] = useState(true)

  useEffect(() => {
    const getPosts = async () => {
      setFetchingPosts(true)
      try {
        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        showToast('Error', error.message, 'error')
        setPosts([])
      } finally {
        setFetchingPosts(false)
      }
    }

    getPosts()
  }, [username, showToast, setPosts])

  // console.log('Posts is here and it is recoil state', posts)

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }

  if (!user && !loading) return <h1>User not found</h1>

  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
      {fetchingPosts && (
        <Flex justifyContent={'center'} my={12}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  )
}

export default UserPage

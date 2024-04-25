import { Flex, Spinner, Text } from '@chakra-ui/react'
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
      if (!user) return
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
  }, [username, showToast, setPosts, user])

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }

  if (!user && !loading) return <Text>User not found</Text>

  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <Text>User has not posts.</Text>}
      {fetchingPosts && (
        <Flex justifyContent={'center'} my={12}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {Array.isArray(posts) &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  )
}

export default UserPage

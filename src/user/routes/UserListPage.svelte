<script lang="ts">
  import { UserList } from '../UserList'
  import type { UserListData } from '../UserList'
  import userMocks from '../user.mock'
  import { Page } from '../../components'

  const users: UserListData[] = userMocks.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
  }))
</script>

<Page title="Users list">
  <UserList {users} />
</Page>

<script lang="ts">
  import { Table } from '../../components'
  import type { UserListData } from './UserListData'

  export let users: UserListData[]

  const headers = ['Id', 'Name', 'Username']
</script>

<Table data={users} {headers} let:item>
  <td>{item.id}</td>
  <td>{item.name}</td>
  <td>{item.username}</td>
</Table>

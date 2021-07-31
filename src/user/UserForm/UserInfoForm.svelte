<script lang="ts">
  import { Field } from '../../components'
  import { isValid, maxLength, required, validate } from '../../utils'

  export let edit: boolean
  export let name: string
  export let username: string
  export let valid: boolean

  $: nameErrors = validate(required())(name)
  $: usernameErrors = validate(required(), maxLength(12))(username)
  $: valid = isValid(nameErrors, usernameErrors)
</script>

<Field name="name" label="Name:" errors={nameErrors} --margin-bottom="2em">
  <input name="name" autocomplete="name" placeholder="Name" bind:value={name} />
</Field>
<Field
  name="username"
  label="Username:"
  errors={usernameErrors}
  --margin-bottom="2em"
>
  <input
    name="username"
    autocomplete="username"
    placeholder="Username"
    disabled={edit}
    bind:value={username}
  />
</Field>

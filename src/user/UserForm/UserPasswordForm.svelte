<script lang="ts">
  import { Field } from '../../components'

  import { equalTo, isValid, minLength, required, validate } from '../../utils'

  export let password: string
  export let valid: boolean
  export let edit = false
  let confirmPassword: string
  let currentPassword: string

  $: passwordErrors = validate(
    required(),
    minLength(8),
    equalTo(confirmPassword, 'The password must be confirmed')
  )(password)
  $: confirmPasswordErrors = validate(required(), minLength(8))(confirmPassword)
  $: currentPasswordErrors = edit
    ? validate(required(), minLength(8))(currentPassword)
    : []

  $: valid = isValid(
    currentPasswordErrors,
    passwordErrors,
    confirmPasswordErrors
  )
</script>

{#if edit}
  <Field
    name="current-password"
    label="Current password:"
    errors={currentPasswordErrors}
    --margin-bottom="2em"
  >
    <input
      type="password"
      name="current-password"
      autocomplete="current-password"
      placeholder="Current password"
      bind:value={currentPassword}
    />
  </Field>
{/if}
<Field
  name="new-password"
  label="Password:"
  errors={passwordErrors}
  --margin-bottom="2em"
>
  <input
    type="password"
    name="new-password"
    autocomplete="new-password"
    placeholder="Password"
    bind:value={password}
  />
</Field>
<Field
  name="confirm-password"
  label="Confirm password:"
  errors={confirmPasswordErrors}
  --margin-bottom="2em"
>
  <input
    type="password"
    name="confirm-password"
    autocomplete="new-password"
    placeholder="Confirm password"
    bind:value={confirmPassword}
  />
</Field>

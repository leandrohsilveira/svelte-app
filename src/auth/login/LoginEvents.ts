export type LoginSubmitEventDetail = {
  username: string
  password: string
}

export type LoginEvents = {
  submit: LoginSubmitEventDetail
}

const mocks = [
  {
    name: "Administrator",
    username: "admin",
    password: "123456",
    roles: ["admin"],
  },
];

export type LoginResult = {
  username: string;
  name: string;
  roles: string[];
};

export interface LoginService {
  login(username: string, password: string): Promise<LoginResult>;
}

export class LoginServiceImpl implements LoginService {
  login(username: string, password: string) {
    return new Promise<LoginResult>((resolve, reject) => {
      setTimeout(() => {
        const user = mocks.find(
          (mock) => mock.username === username && mock.password === password
        );
        if (user)
          resolve({
            username: user.username,
            name: user.name,
            roles: user.roles,
          });
        else reject(new Error("Incorrect username or password"));
      }, 1000);
    });
  }
}

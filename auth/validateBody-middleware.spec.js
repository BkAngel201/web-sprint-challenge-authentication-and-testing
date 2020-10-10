const { validateBody } = require("./validateBody-middleware");
describe("validateBody() Middleweare", () => {
  test("if req.body exist and has the correct properties next should be called", () => {
    const next = jest.fn();
    let req = {
      body: {
        username: "angel",
        password: "123",
      },
    };
    validateBody(req, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith();
  });
});

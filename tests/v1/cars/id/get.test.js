const request = require("supertest");
const app = require("../../../../app");
const { Car } = require("../../../../app/models");

describe("GET /v1/cars/:id", () => {
  let car;

  beforeEach(async () => {
    car = await Car.create({
      name: "Test",
      price: 0,
      image: "images.png",
      size: "small"
    });

    return car;
  });

  afterEach(() => car.destroy());

  it("should response with 200 as status code", async () => {
    return request(app)
      .get("/v1/cars/" + car.id)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            name: car.name,
            price: car.price,
            image: car.image,
            size: car.size,
          })
        );
      });
  });

  it("should response with 404 as status code", async () => {
    return request(app)
      .get("/v1/cars/-1000")
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              name: expect.any(String),
              message: expect.any(String),
              details: {},
            },
          })
        );
      });
  });
});

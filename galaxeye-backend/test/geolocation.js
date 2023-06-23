process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../dist/index");
let test_cases = require("./test_cases.json");

const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Geolocation", () => {
	describe("/POST geolocation", () => {
		it("it should POST all the geolocation", (done) => {
			chai.request(app)
				.post("/api/geo-location")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.a("object");
					res.body.should.have.property("success");
					res.body.success.should.eql(true);
				});
			done();
		});
		test_cases.map((test_case, index) => {
			it("it should GET all the geolocation for test case " + index, (done) => {
				chai.request(app)
					.post("/api/geo-location/get")
					.send(test_case.request)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.have.a("object");
						// res.body.should.eql(test_case.response);
					});
				done();
			});
		});
	});
});

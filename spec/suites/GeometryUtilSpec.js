describe("L.GeometryUtil", function () {
	var map, control, container;

	it("geodesicArea", function () {
		expect(L.GeometryUtil.geodesicArea([
			{ lat: 0,  lng: 0 },
			{ lat: 0,  lng: 10 },
			{ lat: 10, lng: 10 },
			{ lat: 10, lng: 0 },
			{ lat: 0,  lng: 0 }
		])).to.eql(1232921098571.292);
	});

	describe("readableDistance", function () {
		it("metric", function () {
			expect(L.GeometryUtil.readableDistance(0,     true)).to.eql('0 cm');
			expect(L.GeometryUtil.readableDistance(0.187, true)).to.eql('19 cm');
			expect(L.GeometryUtil.readableDistance(0.25,  true)).to.eql('25 cm');
			expect(L.GeometryUtil.readableDistance(1,     true)).to.eql('1.00 m');
			expect(L.GeometryUtil.readableDistance(1.234, true)).to.eql('1.23 m');
			expect(L.GeometryUtil.readableDistance(1000,  true)).to.eql('1.00 km');
			expect(L.GeometryUtil.readableDistance(1235,  true)).to.eql('1.24 km');
			expect(L.GeometryUtil.readableDistance(1500,  true)).to.eql('1.50 km');
		});

		it("imperial", function () {
			expect(L.GeometryUtil.readableDistance(1609.3488537961)).to.eql('1760 yd');
			expect(L.GeometryUtil.readableDistance(1610.3488537961)).to.eql('1.00 miles');
		});
	});
});

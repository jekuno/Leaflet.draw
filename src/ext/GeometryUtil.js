L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
	// Ported from the OpenLayers implementation. See https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/Geometry/LinearRing.js#L270
	geodesicArea: function (latLngs) {
		var pointsCount = latLngs.length,
			area = 0.0,
			d2r = L.LatLng.DEG_TO_RAD,
			p1, p2;

		if (pointsCount > 2) {
			for (var i = 0; i < pointsCount; i++) {
				p1 = latLngs[i];
				p2 = latLngs[(i + 1) % pointsCount];
				area += ((p2.lng - p1.lng) * d2r) *
						(2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
			}
			area = area * 6378137.0 * 6378137.0 / 2.0;
		}

		return Math.abs(area);
	},

	readableArea: function (area, isMetric) {
		var areaStr;

		if (isMetric) {
			if (area >= 10000) {
				areaStr = (area * 0.0001).toFixed(2) + ' ha';
			} else {
				areaStr = area.toFixed(2) + ' m&sup2;';
			}
		} else {
			area /= 0.836127; // Square yards in 1 meter

			if (area >= 3097600) { //3097600 square yards in 1 square mile
				areaStr = (area / 3097600).toFixed(2) + ' mi&sup2;';
			} else if (area >= 4840) {//48040 square yards in 1 acre
				areaStr = (area / 4840).toFixed(2) + ' acres';
			} else {
				areaStr = Math.ceil(area) + ' yd&sup2;';
			}
		}

		return areaStr;
	},

	readableDistance: function (meters, isMetric, useFeet) {
		var distanceStr;

		if (isMetric) {
			// show centimeters when distance < 1m; show metres when distance < 1km, then show kilometers
			if (meters >= 1000) {
				distanceStr = (meters  / 1000).toFixed(2) + ' km';
			} else if (meters >= 1) {
				distanceStr = meters.toFixed(2) + ' m';
			} else {
				distanceStr = Math.round(meters * 100) + ' cm';
			}

		} else {
			meters *= 1.09361;

			if (meters > 1760) {
				distanceStr = (meters / 1760).toFixed(2) + ' miles';
			} else {
				if (useFeet) {
					var feet = meters * 3;
					distanceStr = Math.ceil(feet) + ' ft';
				} else {
					distanceStr = Math.ceil(meters) + ' yd';
				}
			}
		}

		return distanceStr;
	}
});

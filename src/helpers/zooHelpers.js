import { zoo_animals, endangered_order } from './zoodata';

function generateZoo(animals) {
	let tempZoo = [];
	for (let i = 0; i < animals.length; i++) {
		for (let ii = 0; ii < zoo_animals.length; ii++) {
			if (animals[i] === zoo_animals[ii].id) {
				tempZoo.push({ ...zoo_animals[ii] });
			}
		}
	}
	return tempZoo;
}

// ALPHABETICAL
function alphabetSort(prop) {
	return (a, b) => {
		return a[prop].localeCompare(b[prop]);
	};
}
//{a: [], b: []}
function initialSort(animals) {
	// takes alphabetically sorted list, next extrapolate first letters
	let oTempSort = {};
	animals.map((val) => {
		const cur_letter = val.common_name.substr(0, 1);
		if (oTempSort[cur_letter]) {
			oTempSort[cur_letter] = [ ...oTempSort[cur_letter], val ];
		} else {
			oTempSort[cur_letter] = [ val ];
		}
		return true;
	});
	return oTempSort;
}
function findRecord(basis, value, source) {
	let foundRecord = null;
	for (let i = 0; i < source.length; i++) {
		if (source[i][basis] === value) {
			foundRecord = source[i];
		}
	}
	return foundRecord;
}

function filterSort(prop, anim) {
	let aTemp = {};
	let aEndangered = {};

	if (prop === 'alpha') {
		// alphabetical sort is a special case!
		return initialSort(anim.sort(alphabetSort('common_name')));
	}

	anim.forEach((val) => {
		if (aTemp[val.filters[prop]]) {
			aTemp[val.filters[prop]] = [ ...aTemp[val.filters[prop]], val ];
		} else {
			aTemp[val.filters[prop]] = [ val ];
		}
	});
	if (prop === 'status') {
		endangered_order.map((val) => {
			aEndangered[val] = aTemp[val];
			return true;
		});
		return aEndangered;
	}

	return aTemp;
}
export { generateZoo, findRecord, alphabetSort, initialSort, filterSort };

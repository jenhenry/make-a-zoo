function filterAnimals(filter_values) {
	// let's filter the animals!
	// before form is submitted, filter_values = placeholders
	// CONSIDER SEPARATE FUNCTION FOR PLACEHOLDER MANIPULATION
	let filtered_animals = zoo_animals;
	const setofkeys = Object.keys(filter_values);

	if (setofkeys.length) {
		// status, habitat, type, etc
		setofkeys.map((val) => {
			if (filter_values[val].length) {
				// val = type
				filter_values[val].map((value) => {
					// value = mammals
					filtered_animals = filtered_animals.filter((valu) => {
						return value === valu.filters[val];
					});
				});
			}
		});
	}
	let resorted = initialSort(filtered_animals.sort(alphabetSort('common_name')));
	return resorted;
}


openFilter() {
    // when opening the filter dialog, we want to retain current filter items
    // this function needs more help
    this.checkAvailFilters(this.state.sorted_animals);
    const filters = this.state.filters_applied;
    if (filters !== {}) {
        const keys = Object.keys(filters);
        keys.map((val) => {
            if (filters[val].length) {
                filters[val].map((value) => {
                    console.log(value);
                    const filter_item = `#${val}_${value}`;
                    $(filter_item).prop('checked', true);
                });
            }
        });
        // this.state.filters_applied.map((val) => {
        // 	console.log(val.length);
        // 	$('#' + val).attr('checked', true);
        // });
    }
}
clearFilters() {
    // clearing filters should re-enable and uncheck all filter items
    // reset filters available (all should be, does it matter if it's blank or populated?)
    // reset placeholder filtering
    $('form input').attr('disabled', false);
    $('form input').prop('checked', false);
    this.setState({ filters_available: [], filters_placeholder: {} });
}
filterSubmit(e) {
    // submitting will apply the placeholder filters to the menu of animals (sorted_animals)
    // populate the filters_applied with the placeholder values
    try {
        e.preventPropagation();
    } catch (err) {}
    let resorted_animals = filterAnimals(this.state.filters_placeholder);
    this.setState({
        filters_applied: this.state.filters_placeholder,
        sorted_animals: resorted_animals
    });
}
filterChange(e) {
    // each time an item is checked or unchecked
    const cur_filterby = e.target.id.split('_')[0];

    let temp_values = this.state.filters_placeholder;
    // we'll be adding or subtracting (check/uncheck) from/to the placholder filter items

    if (temp_values[cur_filterby]) {
        // if the filtered by exists (location, status, etc)
        if (temp_values[cur_filterby].indexOf(e.target.value) === -1) {
            // if that category has the value (africa, endangered, etc)
            // add this value to this filter category
            temp_values[cur_filterby] = [ ...temp_values[cur_filterby], e.target.value ];
        } else {
            // if this value already exists, we're unchecking the box and need to remove
            temp_values[cur_filterby] = temp_values[cur_filterby].filter((val) => {
                // return only records that DON'T include the value
                return val !== e.target.value;
            });
        }
    } else {
        // if the filter category doesn't exist yet, add it and the value
        temp_values[cur_filterby] = [ e.target.value ];
    }
    // set the placholder filters
    this.setState(
        (st) => ({
            filters_placeholder: temp_values
        }),
        () => {
            // after setting the placholder filters, apply those filters
            const filter_result = filterAnimals(temp_values);
            // based on the applied filters, check to see what other filters are still available
            // (exclude mutually exclusive values - eg, can't have habitat tundra checked and other habitats available)
            this.checkAvailFilters(filter_result);
        }
    );
}
checkAvailFilters(animals) {
    // disable all checkboxes
    $('form input').attr('disabled', true);
    let temp_animals = [];
    let temp_filters_available = [];
    const setofkeys = Object.keys(animals);
    if (setofkeys.length) {
        // status, habitat, type, etc
        // extract animal records
        setofkeys.map((val) => {
            temp_animals = [ ...temp_animals, ...animals[val] ];
        });
    }
    // for each animal ...
    //console.log(animals);
    temp_animals.map((val) => {
        //console.log(val.filters);
        const filterkeys = Object.keys(val.filters);
        // get this animal's filter properties (individual type, habitat, etc)
        filterkeys.map((value) => {
            //console.log(val.filters[value]);
            const new_filter = `${value}_${val.filters[value]}`;
            // if this animal's filters aren't already included, include them
            if (temp_filters_available.indexOf(new_filter) === -1) {
                temp_filters_available = [ ...temp_filters_available, new_filter ];
            }
        });
    });
    // set filters available
    this.setState(
        (st) => ({
            filters_available: temp_filters_available
        }),
        () => {
            // after setting filters available, enable each available one
            temp_filters_available.map((val) => {
                $('#' + val).attr('disabled', false);
            });
        }
    );
}


<button
						type="button"
						className="btn btn-info btn-sm filter"
						data-toggle="modal"
						data-target="#filter"
						onClick={this.openFilter}
					>
						<i className="fas fa-filter" />
					</button>


<div
					className="modal fade"
					id="filter"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="filterTitle"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="filterTitle">
									Filter Animals
								</h5>
								{/* <button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
									onClick={this.clearFilters}
								>
									<span aria-hidden="true">&times;</span>
								</button> */}
							</div>
							<div className="modal-body d-flex">
								<form className="d-flex" onSubmit={this.filterSubmit} onChange={this.filterChange}>
									<div className="category">
										<div>Type</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="type_amphibians"
												value="amphibians"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="type_amphibians">
												Amphibians
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="type_birds"
												value="birds"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="type_birds">
												Birds
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="type_mammals"
												value="mammals"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="type_mammals">
												Mammals
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="type_reptiles"
												value="reptiles"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="type_reptiles">
												Reptiles
											</label>
										</div>
									</div>
									<div className="category">
										<div>Location</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="location_africa"
												value="africa"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="location_africa">
												Africa
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="location_asia"
												value="asia"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="location_asia">
												Asia
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="location_australia"
												value="australia"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="location_australia">
												Australia
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="location_south_america"
												value="south_america"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="location_south_america">
												South America
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="location_subantarctic"
												value="subantarctic"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="location_subantarctic">
												Subantarctic
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="location_polar"
												value="polar"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="location_polar">
												Polar
											</label>
										</div>
									</div>
									<div className="category">
										<div>Habitat</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_temperate_forests"
												value="temperate_forests"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_temperate_forests">
												Temperate Forests
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_tropical_forests"
												value="tropical_forests"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_tropical_forests">
												Tropical Forests
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_plateaus"
												value="plateaus"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_plateaus">
												Plateaus
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_savannahs"
												value="savannahs"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_savannahs">
												Savannahs
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_tropical_waters"
												value="tropical_waters"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_tropical_waters">
												Tropical Waters
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_rivers"
												value="rivers"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_rivers">
												Rivers
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_rainforests"
												value="rainforests"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_rainforests">
												Rainforests
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_coastal_areas"
												value="coastal_areas"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_coastal_areas">
												Coastal Areas
											</label>
										</div>
										{/* <div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_grasslands"
												value="grasslands"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_grasslands">
												Grassland
											</label>
										</div> */}
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_forests"
												value="forests"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_forests">
												Forests
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_tundras"
												value="tundras"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_tundras">
												Tundras
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="habitat_cliffs"
												value="cliffs"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="habitat_cliffs">
												Cliffs
											</label>
										</div>
									</div>
									<div className="category">
										<div>Endangered Status</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="status_critical"
												value="critical"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="status_critical">
												Critically Endangered
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="status_endangered"
												value="endangered"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="status_endangered">
												Endangered
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="status_vulnerable"
												value="vulnerable"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="status_vulnerable">
												Vulnerable
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="status_near_threatened"
												value="near_threatened"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="status_near_threatened">
												Near Threatened
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="status_least_concern"
												value="least_concern"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="status_least_concern">
												Least Concern
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="status_species_dependent"
												value="species_dependent"
												disabled={filter_disabled}
											/>
											<label className="form-check-label" htmlFor="status_species_dependent">
												Species Dependent
											</label>
										</div>
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-link mr-auto" onClick={this.clearFilters}>
									Clear Filters
								</button>
								<button
									type="button"
									className="btn btn-outline-secondary"
									onClick={this.clearFilters}
									data-dismiss="modal"
								>
									Cancel
								</button>
								<button
									type="button"
									className="btn btn-info"
									data-dismiss="modal"
									onClick={this.filterSubmit}
								>
									Apply
								</button>
							</div>
						</div>
					</div>
				</div>
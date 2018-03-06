import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  RefinementList,
  Stats,
  Pagination,
  Highlight,
  Configure,
  ClearAll
} from 'react-instantsearch/dom';
import { connectHits, connectRange } from 'react-instantsearch/connectors';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
//import './App.css';
 //console.log(Hits);

const CustomHits = connectHits(({ hits }) =>

<div>
  {hits.map(hit =>
    <div className="hit" key={hit.objectID}>
      <div className="hit-image">
        <img alt={hit.name} src={`${hit.imageUrl}`} />
      </div>
      <div className="hit-content">
        <div className="hit-price">
          Rp. {hit.price}
        </div>
        <div className="hit-name">
          {hit.name}
        </div>
       
        <div className="hit-description">
           Visitor Space:  {hit.avgVisitor} <br />
          <Highlight attributeName="name" hit={hit} /> <br />
          <Highlight attributeName="category" hit={hit} /><br />
          <Highlight attributeName="avgVisitor" hit={hit} /> <br />
        </div>
      </div>
    </div>
  )}
</div>
);


// const RightColumn = () =>
//   <div id="right-column">
//     <div className="info">
//       <Stats />
//       <SortBy
//         defaultRefinement="tes"
//         items={[
//           { value: 'instant_search', label: 'Most Relevant' },
//           { value: 'instant_search_price_asc', label: 'Lowest Price' },
//           { value: 'instant_search_price_desc', label: 'Highest Price' },
//         ]}
//       />
//     </div>
//      <CustomHits />
    
//     <Configure hitsPerPage={5} />
//     <div id="pagination">
//       <Pagination showLast />
//     </div>
//   </div>;


class Range extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    currentRefinement: PropTypes.object,
    refine: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired
  };

  state = { currentValues: { min: this.props.min, max: this.props.max } };

  componentWillReceiveProps(sliderState) {
    if (sliderState.canRefine) {
      this.setState({
        currentValues: {
          min: sliderState.currentRefinement.min,
          max: sliderState.currentRefinement.max
        }
      });
    }
  }

  onValuesUpdated = sliderState => {
    this.setState({
      currentValues: { min: sliderState.values[0], max: sliderState.values[1] }
    });
  };

  onChange = sliderState => {
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      this.props.refine({
        min: sliderState.values[0],
        max: sliderState.values[1]
      });
    }
  };

  render() {
    const { min, max, currentRefinement } = this.props;
    const { currentValues } = this.state;
    return min !== max ? (
      <div>
        <Rheostat
          className="ais-RangeSlider"
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{currentValues.min}</div>
          <div>{currentValues.max}</div>
        </div>
      </div>
    ) : null;
  }
}

const ConnectedRange = connectRange(Range);

const Content = () =>
  <div className="row">
     <div className="col-md-4">

       <div>
        <h5>Category</h5>
        <RefinementList 
            attributeName="category"
            translations={{ noResults: 'No matching Category' }}

            />
         <h5>Jenis Event</h5>
        <RefinementList
          attributeName="types"
          translations={{ noResults: 'No matching tipe' }}
        />
        <h5>Area</h5>
        <RefinementList
          attributeName="area"
          translations={{ noResults: 'No matching area' }}
        />

        <h5>Harga</h5>
        <ConnectedRange 

            attributeName="price" 
             max={1000000}
              min={100000}
              precision={0}

            />

        <h5>Jenis Kerjasama</h5>
        <RefinementList
          attributeName="collabs"
          translations={{ noResults: 'No matching collabs' }}
        />
         <h5>Facility</h5>
        <RefinementList
          attributeName="facilities"
          translations={{ noResults: 'No matching facility' }}
        />
        <h5>Jenis Visitor</h5>
        <RefinementList
          attributeName="visitors"
          translations={{ noResults: 'No matching Visitor' }}
        />


       
      </div>

      </div>
       

      <div className="col-md-8">
      <Stats />
      
     
              <CustomHits  />
    
    <Configure hitsPerPage={10} />
    <div id="pagination">
      <Pagination showLast />
    </div>

      </div>
    </div>;

class App extends Component {
  render() {
    return (
      <div className="App">
        
       <InstantSearch
            apiKey="8acf0b10b40ee65f08db299ed5eb2372"
            appId="X0RKYDMJ0J"
            indexName="tes"
            refresh={false}
            className="container-fluid"
          >
          <header id="header">
            <img alt="instant-search-logo" src="https://blog.spazee.id/wp-content/themes/spazee/images/logos/logo-nav.png" />
            <SearchBox translations={{ placeholder: 'Search Space' }} />
          </header>
          <main>
           <ClearAll />


           <Content />
          </main>
           
      </InstantSearch>
      </div>
    );
  }
}


export default App;
  
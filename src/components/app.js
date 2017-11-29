import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReports } from '../actions';
import ReactAutocomplete from 'react-autocomplete';

class App extends Component {
  componentWillMount() {
    this.props.fetchReports();
  }
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  render() {
    const { isfetched, reports } = this.props;

    if (!isfetched) {
      return <div>loading...</div>
    }

    const results = reports.filter(report => (report.WeatherText == this.state.value))

    return (
      <div className="m-t-2">
        <div className="row">
          <ReactAutocomplete
            getItemValue={(report) => report.WeatherText}
            items={reports}
            shouldItemRender={(report, value) => report.WeatherText.toLowerCase().indexOf(value.toLowerCase()) > -1}
            renderItem={(report, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {report.WeatherText}
              </div>
            }
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            onSelect={value => this.setState({ value })}

          />
        </div>
        <div className="row m-t-2">
          {this.state.value ? 
            <ul className="p-l-0">{results.map(result => <li className="card card-inverse card-info p-a-1 col-md-6" key={result.LocalizedName}>
                <h1 className="card-title">{result.LocalizedName}</h1>
                <p className="card-text">{result.Temperature.Metric.Value} {result.Temperature.Metric.Unit}</p>
                <p className="card-text">{result.Precip1hr.Metric.Value} {result.Precip1hr.Metric.Unit}</p>
              </li>)}</ul>
           : ""}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  reports: state.reports.reports,
  isfetched: state.reports.isfetched
});

export default connect(mapStateToProps, { fetchReports })(App);

import React, {PropTypes} from 'react'

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Calendar} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {startWeather} from '../../actions/weather';


import './index.less'


class Weather extends React.Component {
	state = {
		calendarShow: false,
	};

	calendarhandler(value, mode) {
		console.log(value, mode);
	}
	calendarSelect(value) {
		console.log(value);
	}
	showCalendar () {
		this.setState({calendarShow: !this.state.calendarShow});
	}
	componentWillMount () {
		this.props.startWeather && this.props.startWeather();
	}

	render() {
		const {calendarShow} = this.state;
		console.log('weather');
		console.log(this.props.weather);

		return (
			<div className="weather-outer">
				<h1>Weather</h1>
				<div className="weather-header">
					<div className="back-btn "><Icon type="left" /></div>
					<div className="title">{'{city}'}</div>
				</div>
				<div style={{ width: 290, borderRadius: 4 }}>
					<Icon className="calendar-ic" type="calendar" onClick={::this.showCalendar}/>

					{
						calendarShow ?
							<Calendar
								fullscreen={false}
								onPanelChange={this.calendarhandler}
								onSelect={this.calendarSelect}
								mode="month"
							/>
							: null
					}
				</div>
				<div className="weather-slider">
					<div className="wrapper">
						<div className="inner">
							<div className="week">
								<div className="day">
									<div className="name">Пт</div>
									<div className="number">12</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="weather-detail">
					<div className="wrapper">
						<div className="item">
							some data///
						</div>
					</div>
				</div>
			</div>
		);

	}
}
Weather.propTypes = {
	isLoad: PropTypes.bool,
	children: PropTypes.node
};

function mapStateToProps(state)  {
	return {
		weather: state.weather
	};
}

const mapDispatchToProps = (dispatch) => {
	return {startWeather: bindActionCreators(startWeather, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

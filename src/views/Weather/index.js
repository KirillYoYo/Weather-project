import React, {PropTypes} from 'react'

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Calendar} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {startWeather, updateWeather} from '../../actions/weather';

import { Spin } from 'antd';
import moment from 'moment';


import './index.less'


class Weather extends React.Component {
	state = {
		calendarShow: false,
		dayesInSlider: [],
		choisenDay: null,
		sliderDayActive: 0,
		updateWeatherHandlerCnt: 0,
		allData: 0,
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

	getDayOfWeek (num) {
		switch (num) {
			case 0:
				return 'Пн';
			case 1:
				return 'Вт';
			case 2:
				return 'Ср';
			case 3:
				return 'Чт';
			case 4:
				return 'Пт';
			case 5:
				return 'Сб';
			case 6:
				return 'Вс';
			default:
				return '';
		}
	}

	getDaysForSlider () {
		const isNewCall = (value) => {
			if (value.cnt_call && value.cnt_call ===  this.state.updateWeatherHandlerCnt) {
				return true
			}
		};

		const {isLoad, items} = this.props.weather;
		let new_arr = this.state.dayesInSlider;
		let arr_dates = [];
		let arr_new_call = items.list.filter(isNewCall);
		let arr_dates_new_call = [];


		if (new_arr.length === 0) {
			items && items.list.map((item, i) => {
				if (arr_dates.indexOf(item.dt_txt.split(' ')[0]) === -1) {
					arr_dates.push(item.dt_txt.split(' ')[0]);
					new_arr.push(item)
				}
			});
		}

		arr_new_call && arr_new_call.map((item, i) => {
			if (arr_dates_new_call.indexOf(item.dt_txt.split(' ')[0]) === -1) {
				arr_dates_new_call.push(item.dt_txt.split(' ')[0]);
				new_arr.push(item)
			}
		});

		this.setState((prevState) => {
			return {
				...prevState,
				dayesInSlider: new_arr,
			};
		});

		return new_arr;
	}
	sliderDayHandler (date, cnt, cnt_call) {
		const {isLoad, items} = this.props.weather;
		let new_arr = [];

		items && items.list.map((item, i) => {
			if (cnt_call) {
				if (cnt_call === item.cnt_call) {
					if (date.split(' ')[0] === item.dt_txt.split(' ')[0]) {
						new_arr.push(item)
					}
				}
			} else {
				if (date.split(' ')[0] === item.dt_txt.split(' ')[0]) {
					new_arr.push(item)
				}
			}

		});

		this.setState((prevState) => {
			return {
				...prevState,
				choisenDay: new_arr,
				sliderDayActive: cnt,
			};
		});
	}
	updateWeatherHandler () {
		let cnt = this.state.updateWeatherHandlerCnt;
		cnt++;
		this.props.updateWeather && this.props.updateWeather(cnt);
		this.setState((prevState) => {
			return {
				...prevState,
				updateWeatherHandlerCnt: cnt,
			};
		});
	}
	componentWillMount () {
		this.props.startWeather && this.props.startWeather();
	}

	componentDidUpdate (previousProps, previousState) {
		if (previousProps.weather !== this.props.weather ) {
			this.props.weather.isLoad ?
				this.getDaysForSlider()
			: null
		}
	}

	render() {
		const {calendarShow} = this.state;
		const {isLoad, items} = this.props.weather;

		return (
			<div className="weather-outer">
				<h1>Weather</h1>
				<div className="weather-header">
					<div className="back-btn "><Icon type="left" /></div>
					<div className="title"><h2>{items && items.city.name || 'Погода'}</h2></div>
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
					{isLoad
						?
						<div className="wrapper">
							<div className="btn-back"><Icon type="left" /></div>
							<div className="btn-next" onClick={this.updateWeatherHandler.bind(this)}><Icon type="right" /></div>
							<div className="inner">
								{
									this.state.dayesInSlider.map( (item, i) => {
										if (i === 0 && !this.state.choisenDay) {
											this.sliderDayHandler(this.state.dayesInSlider[0].dt_txt, i, item.cnt_call);
										}
										let flag = false;
										let active = i === this.state.sliderDayActive ? 'active' : null;


										return (
											item.main ?
												<div className={'day' +' '+ active} key={i} onClick={this.sliderDayHandler.bind(this, item.dt_txt, i, item.cnt_call)}>
													<div className="name">{this.getDayOfWeek(moment(item.dt_txt).day())}</div>
													<div className="number">
														<span>{item.main.temp}</span>
													</div>
													<div className="number min-max">
														<span>{item.main.temp_min}</span>
														<span>{item.main.temp_max}</span>
													</div>
												</div>
											: <div><img src='http://alldes.net/images/photoshop/button/id457/rez.jpg' /><h4>На указанную дату прогноз отсутствует</h4></div>
										);
									})
								}
							</div>
						</div>
						:
						<Spin tip="Loading...">
						</Spin>
					}
				</div>
				<div className="weather-detail">
					<div className="wrapper">
						{
							this.state.choisenDay ?
								<div className="weather-more">
									<div className="inf">
										<img src={'http://openweathermap.org/img/w/' + this.state.choisenDay[0].weather[0].icon + '.png'} />
										<div className="cloud">{this.state.choisenDay[0].weather[0].description}</div>
										<div className="wind">
											wind: {this.state.choisenDay[0].wind.speed} km/h, {this.state.choisenDay[0].wind.deg} deg
										</div>
									</div>
									{this.state.choisenDay.map( (item, i) => {
										return (
											<div className="item" key={i}>
												<span>{moment(item.dt_txt).format('HH:mm')}</span>
												<span>{item.main.temp}</span>
											</div>
										)
									})}
								</div>
							:
							<Spin tip="Loading...">
							</Spin>
						}

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
	return {
		startWeather: bindActionCreators(startWeather, dispatch),
		updateWeather: bindActionCreators(updateWeather, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

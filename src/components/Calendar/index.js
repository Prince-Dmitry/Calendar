import React from "react";
import "./index.css";
import * as calendar from './calendar';

class Calendar extends React.Component {
  static defaultProps = {
    date: new Date(),
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    weekDaysNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    onChange: Function.prototype,
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  };

  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }

  handlePrivMonthButtonClick = () => {
      const date = new Date(this.year, this.month-1);
      this.setState({ date });
  };

  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month+1);
    this.setState({ date });
  };

  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;
      this.setState({ date: this.state.selectedDate})
  };

  handleDateClick = (date) => {
    console.log(date);
    this.setState({
      selectedDate: date
    })
    this.props.onChange(date);
  }

  render() {
    const { years, monthNames, weekDaysNames } = this.props;
    const monthDate = calendar.getMonthDate(this.year, this.month);

    return (
      <div className="calendar">
        <header>
          <button onClick={this.handlePrivMonthButtonClick}>{"<"}</button>
          <select onChange={this.handleSelectChange} ref={element => this.monthSelect = element} value={this.month}>
            {monthNames.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
          <select onChange={this.handleSelectChange} ref={element => this.yearSelect = element} value={this.year}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button onClick={this.handleNextMonthButtonClick}>{">"}</button>
        </header>
        <table>
          <thead>
            <tr>
              {weekDaysNames.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthDate.map((week, index) => (
              <tr key={index} className="week">
                {week.map((date, index) =>
                  date ? (
                    <td key={index} className="day"
                    onClick={() => this.handleDateClick(date)}>
                      {date.getDate()}
                    </td>
                  ) : (
                    <td key={index}></td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;

import React, { Component } from 'react';
import { Row } from '../viewer-table/row/index';
import './style.css';
import LazyLoad from 'react-lazyload';


function RowList(props) {//массив строк, каждая строка обёрнута в LazyLoad для динамической загрузки
	const listItems = [];

	for (let i = props.start; i < props.data.length; i++) {
		listItems.push(
			<LazyLoad height={50} key={i}>
				<Row cols={props.cols} data={props.data} shrek={i} clck={props.clck} dblclck={props.dblclck}></Row>
			</LazyLoad>);
	}
	return (
		<div className={props.tclass}>
			{listItems}
		</div>
	);
}

class ViewerTable extends Component {//таблица с шапкой
	constructor(props) {
		super(props);
		this.obj1 = null;//объект, выбранный обычным кликом
		this.obj2 = null;//объект, выбранный двойным кликом
		this.url = "http://localhost:4000/shrek";//адрес сервера
		this.data2 = {};
		this.edited = false;//переменная, определяющая, находится ячейка в режиме изменения или нет
	}
	clck(e) {//обработка клика на ячейку

		if (this.obj1 != null) this.obj1.setAttribute("style", "border: ");
		if (this.edited) {
			this.submit(this.obj2.id[1], this.obj2.id[0]);
		}
		else if(this.obj2!==null)
		{
			this.obj2.setAttribute("contentEditable", "false");
			this.edited = false;
		}
		e.target.setAttribute("style", "border: 2px solid blue");
		this.obj1 = e.target.closest('.divTableCell');
	}

	dblclck(e) {//обработка двойного клика на ячейку
		e.target.setAttribute("contentEditable", "true");
		e.target.setAttribute("style", "border: 2px solid green");
		this.obj2 = e.target.closest('.divTableCell');
		this.edited = true;
	}

	remove_probely(data) {//удаление ячеек с пробелами и пустых ячеек из массива данных
		let data2 = data;
		for (let i in data2) {
			for (let j in data2[i]) {
				if (data2[i][j] === " ") delete data2[i][j];
				else if (data2[i][j] === "") delete data2[i][j];
			}
		}
		return data2;
	}

	create_disciplines(data) {//создание массива данных для БД из таблицы нагрузки
		let fields = [];//массив
		for (let i = 6; i < 315; i++) {//заполнение массива для первого семестра
			if (data[i].hasOwnProperty("A")) fields.push(
				{
					title: data[i].A,
					hours_lec: (data[i].hasOwnProperty("I")) ? data[i].I : 0,
					hours_lab: (data[i].hasOwnProperty("L")) ? data[i].L : 0,
					hours_seminar: (data[i].hasOwnProperty("J")) ? data[i].J : 0,
					hours_con_ekzamen: (data[i].hasOwnProperty("N")) ? data[i].N : 0,
					hours_ekzamen: (data[i].hasOwnProperty("R")) ? data[i].R : 0,
					hours_zachet: (data[i].hasOwnProperty("P")) ? data[i].P : 0,
					hours_kursovoy: (data[i].hasOwnProperty("T")) ? data[i].T : 0,
					hours_GEK: (data[i].hasOwnProperty("V")) ? data[i].V : 0,
					hours_ruk_prakt: (data[i].hasOwnProperty("W")) ? data[i].W : 0,
					hours_ruk_VKR: (data[i].hasOwnProperty("X")) ? data[i].X : 0,
					hours_ruk_magic: (data[i].hasOwnProperty("Y")) ? data[i].Y : 0,
					hours_ruk_aspirant: (data[i].hasOwnProperty("Z")) ? data[i].Z : 0,
					hours_PD: (data[i].hasOwnProperty("H")) ? data[i].H : 0,
					semester: 1,
					groups: data[i].C
				}
			);
		}
		for (let i = 317; i < 611; i++) {//заполнение массива для второго семестра
			if (data[i].hasOwnProperty("A")) fields.push(
				{
					title: data[i].A,
					hours_lec: (data[i].hasOwnProperty("I")) ? data[i].I : 0,
					hours_lab: (data[i].hasOwnProperty("L")) ? data[i].L : 0,
					hours_seminar: (data[i].hasOwnProperty("J")) ? data[i].J : 0,
					hours_con_ekzamen: (data[i].hasOwnProperty("N")) ? data[i].N : 0,
					hours_ekzamen: (data[i].hasOwnProperty("R")) ? data[i].R : 0,
					hours_zachet: (data[i].hasOwnProperty("P")) ? data[i].P : 0,
					hours_kursovoy: (data[i].hasOwnProperty("T")) ? data[i].T : 0,
					hours_GEK: (data[i].hasOwnProperty("V")) ? data[i].V : 0,
					hours_ruk_prakt: (data[i].hasOwnProperty("W")) ? data[i].W : 0,
					hours_ruk_VKR: (data[i].hasOwnProperty("X")) ? data[i].X : 0,
					hours_ruk_magic: (data[i].hasOwnProperty("Y")) ? data[i].Y : 0,
					hours_ruk_aspirant: (data[i].hasOwnProperty("Z")) ? data[i].Z : 0,
					hours_PD: (data[i].hasOwnProperty("H")) ? data[i].H : 0,
					semester: 2,
					groups: data[i].C
				}
			);
		}

		return fields;
	}

	senddata(data1, cols1) {//отправка данных на сервер
		let data2 = this.remove_probely(data1);//удаление пробелов из данных
		fetch(this.url, {
			method: 'post',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*' },
			body: JSON.stringify({
				disciplines: (data2[0].A === "Расчет часов учебной работы по кафедре Инфокогнитивные технологии") ? this.create_disciplines(data2) : [],
				data: data2,
				cols: cols1
			})
		});
	}

	submit(row, col) {//метод изменения и последующей отправки данных
		this.changeData((row - 1).toString(), col.toString(), document.getElementById(this.obj2.id[0] + this.obj2.id[1]).innerHTML);
		this.senddata(this.data2, this.props.schema);
	}

	changeData(row, col, value) {//добавление в массив данных ячейки строки row столбца col с новым значением value
		this.data2 = this.props.data;
		this.data2[row][col] = value;
	}

	render() {
		return (
			<div className="divTable">
				<RowList tclass={(this.props.filtered) ? "divTableBody" : "divTableHeader"} start={0} data={this.props.data.slice(0, 4)} cols={this.props.schema} clck={(e) => this.clck(e)} dblclck={(e) => this.dblclck(e)}></RowList>
				<RowList tclass="divTableBody" start={4} data={this.props.data} cols={this.props.schema} clck={(e) => this.clck(e)} dblclck={(e) => this.dblclck(e)}></RowList>
			</div>
		)
	}
}

export { ViewerTable };
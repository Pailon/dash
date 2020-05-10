import XLSX from 'xlsx';

/* Создает массив объектов наименований столбцов */
const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};

/* Доступные для загрузки форматы файлов */
const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

export { make_cols, SheetJSFT };
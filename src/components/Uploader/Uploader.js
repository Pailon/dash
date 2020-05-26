import React from "react";
import './Uploader.css'
import Alert from "../UI/Alert/Alert";


export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: '', openAlert: false,//видно ли окно оповещения
        };
    }

    componentDidMount() {
        console.log(this.props.item)
    }

    async _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        let data = this.state.file
        let formData = new FormData()
        formData.append(`${this.state.file.name}`, data);

        let url = `http://dashboard.kholodov.xyz/api/ind_plan/` //ссылка для запроса к таблице преподаавтелей
        const token = localStorage.getItem('token')// взяли токен

        try {
            const response = await fetch(url, {
                method: 'POST', // или 'PUT'
                body: formData, // данные могут быть 'строкой' или {объектом}!
                headers: {
                    'Content-Type': 'multipart/form-data',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log('Ответ:', JSON.stringify(json));// результат запроса
            this.setState({openAlert:true, color:'success', text:'Успешно'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
        } catch (error) {
            console.error('Ошибка:', error); //выдаёт ошибку в консоль
            this.setState({openAlert:true, color:'danger', text:'Ошибка'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
        }


    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    onCloseAlert = () => {
        this.setState({ openAlert: false }) // закрыть окно оповещения
    }

    render() {
        return (
            <div className="previewComponent">
                {
                    this.state.openAlert ?  //компонент вывода предупреждения
                        <Alert
                            color={this.state.color} //цвет оповещения
                            text={this.state.text} // текст в оповещении
                            onCloseAlert={this.onCloseAlert} // функция как закрыть это окошко
                        />
                        : null
                }
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton"
                            type="submit"
                            onClick={(e)=>this._handleSubmit(e)}>Загрузить РПД</button>
                </form>
            </div>
        )
    }
}


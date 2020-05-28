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
        //console.log(this.props.item)
    }

    async _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);

        let newData = new FormData(document.forms.inputForm)

        let data = this.state.file
        let formData = new FormData()
        formData.append(`file`, data);

        // const FormData={file: data}


        let url = `http://dashboard.kholodov.xyz/api/uploads/ind_plan` //ссылка для запроса к таблице преподаавтелей
        const token = localStorage.getItem('token')// взяли токен

        try {
            const response = await fetch(url, {
                method: 'POST', // или 'PUT'
                body: newData, // данные могут быть 'строкой' или {объектом}!
                headers: {
                    // 'Content-Type': 'multipart/form-data;boundary="boundary"',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            });
            const json = await response.json();
            if(json.message === "Загрузка файла не удалась!"){
                this.setState({openAlert:true, color:'danger', text:'Загрузка файла не удалась!'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            } else if(json.message === "Не был передан файл"){
                this.setState({openAlert:true, color:'danger', text:'Не был передан файл!'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }
            else{
                console.log('Ответ:', JSON.stringify(json));// результат запроса
                this.setState({openAlert:true, color:'success', text:'Файл загружен'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }

            console.log('Ответ:', JSON.stringify(json))
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

        let file = e.target.files[0];
        console.log(file)
        let reader = new FileReader();

        reader.onload= () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

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
                <form onSubmit={(e)=>this._handleSubmit(e)} name='inputForm'>
                    <input className="fileInput"
                           type="file"
                           name='file'
                           onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton"
                            type="submit"
                            onClick={(e)=>this._handleSubmit(e)}>Загрузить индив. план</button>
                </form>
            </div>
        )
    }
}


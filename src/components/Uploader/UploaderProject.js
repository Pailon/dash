import React from "react";
import './Uploader.css'
import Alert from "../UI/Alert/Alert";
import {link} from "../../Link";


export default class UploaderProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: '', openAlert: false,//видно ли окно оповещения
        };
    }

    async _handleSubmit(e) {
        e.preventDefault();
        //console.log('handle uploading-', this.state.file);
        //console.log(this.props)

        let newData = new FormData(document.forms.inputForm)

        let data = this.state.file
        let formData = new FormData()
        formData.append(`file`, data);

        // const FormData={file: data}

        let url = link + `/uploads/projects`
        newData.append(`project_id`, this.props.project_id);

        //console.log(newData)

        // if(this.props.link === true){
        //     url = link + `/uploads/rpd`
        //     newData.append(`discipline_id`, this.props.discipline);
        // }else{
        //     url = link + `/uploads/ind_plan`
        // }
        //url = `http://dashboard.kholodov.xyz/api/uploads/ind_plan` //ссылка для запроса к таблице преподаавтелей
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
            //console.log(response)
            if(response.status === 201){
                this.setState({openAlert:true, color:'success', text:'Загружено'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }
            if(response.status === 500){
                this.setState({openAlert:true, color:'danger', text:'Ошибка загрузки файла'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }
            if (response.status === 400){
                this.setState({openAlert:true, color:'danger', text:'Невалидные данные'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }
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
        //console.log(file)
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
                            onClick={(e)=>{
                                this._handleSubmit(e)
                            }}>Загрузить файл</button>

                </form>
            </div>
        )
    }
}


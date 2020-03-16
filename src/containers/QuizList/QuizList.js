import React, { Component } from 'react'
import classes from './QuizList.module.css'
import Loader from '../../components/UI/Loader/Loader'
import Table from '../../components/UI//Table/Table'
import _ from 'lodash'
import DetailRowView from '../../components/UI/DetailRowView/DetailRowView'
import ReactPaginate from 'react-paginate';
import TableSearch from '../../containers/TableSearch/TableSearch'



export default class QuizList extends Component {

    state = {
        data: [],
        isLoading: true,
        sort: 'asc',  //desc
        sortField: 'person_id',
        row: null,
        currentPage: 0,
        search:''
    }

    async componentDidMount() {

        let url = 'http://dashboard.kholodov.xyz/api/teachers'
        const token = localStorage.getItem('token')
        //console.log(token)
        try {

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log('Я ответ', response)


            const data = await response.json()
            console.log('Я ответ', data)
            this.setState({
                isLoading: false,
                data: _.orderBy(data, this.state.sortField, this.state.sort)
            })

        } catch (e) {
            console.log(e)

        }


    }

    onSort = (sortField) => {
        const clonedData = this.state.data.concat()
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc'

        const data = _.orderBy(clonedData, sortField, sort)

        this.setState({
            data,
            sort,
            sortField
        })

    }

    onRowSelect = row => {
        this.setState({ row })
    }

    pageChangeHandler = ({ selected }) => {
        this.setState({ currentPage: selected })
    }

    searchHandler = search =>{
        this.setState({search, currentPage: 0})
    }

    getFiltredData(){
        const {data, search} = this.state

        if (!search){
            return data
        }

        return data.filter(item=>{
            return item['name'].toLowerCase().includes(search.toLowerCase()) 
            || item['surname'].toLowerCase().includes(search.toLowerCase())
            || item['patronymic'].toLowerCase().includes(search.toLowerCase())
            || item['email'].toLowerCase().includes(search.toLowerCase())
        })
    }




    render() {
        const pageSize = 10

        const filtredData = this.getFiltredData()

        const pageCount = Math.ceil(filtredData.length / pageSize)

        const displayData = _.chunk(filtredData, pageSize)[this.state.currentPage]
        return (
            <div className="container">
                {
                    this.state.isLoading
                        ? <Loader />
                        : <React.Fragment>
                            <TableSearch onSearch={this.searchHandler}/>
                            <Table
                                data={displayData}
                                onSort={this.onSort}
                                sort={this.state.sort}
                                sortField={this.state.sortField}
                                onRowSelect={this.onRowSelect}
                            />
                        </React.Fragment>


                }

                {
                    this.state.data.length > pageSize
                        ? <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.pageChangeHandler}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            forcePage={this.state.currentPage}
                        /> : null
                }

                {
                    this.state.row
                        ? <DetailRowView person={this.state.row} />
                        : null
                }
            </div>
        )
    }
}
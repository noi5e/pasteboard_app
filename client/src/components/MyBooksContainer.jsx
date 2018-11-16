import React from 'react';
import Post from '../../modules/Post.js';
import Auth from '../../modules/Auth.js';
import MyBooksForm from './MyBooksForm.jsx';
import MyBookRow from './MyBookRow.jsx';
import MyBookToSendRow from './MyBookToSendRow.jsx';
import MyBookToReceiveRow from './MyBookToReceiveRow.jsx'
import { Panel } from 'react-bootstrap';

class MyBooksContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			successMessage: '',
			books: [],
			acceptedTradeRequests: [],
			formBook: {
				title: '',
				author: ''
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const field = event.target.id;
		const formBook = this.state.formBook;
		formBook[field] = event.target.value;

		this.setState({
			formBook: formBook
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const title = encodeURIComponent(this.state.formBook.title);
		const author = encodeURIComponent(this.state.formBook.author);
		const formData = `title=${title}&author=${author}`;

		Post.makePostRequest(formData, '/api/add_new_book', true, (xhr) => {
			if (xhr.status === 200) {
				this.setState({
					books: xhr.response.books,
					formBook: {
						title: '',
						author: ''
					},
					successMessage: xhr.response.message
				});
			} else {
				const errors = xhr.response.errors ? xhr.response.errors : {};
				errors.summary = xhr.response.message;

				this.setState({ errors });
			}
		});
	}

	handleAcceptRequest(event) {
		event.preventDefault();

		const ids = event.target.id.split('&');
		const formData = `userId=${ids[0]}&bookId=${ids[1]}`;

		Post.makePostRequest(formData, '/api/accept_trade_request', true, (xhr) => {
			if (xhr.status === 200) {
				let newBooks = this.state.books.slice(0);
				
				for (let i = 0; i < newBooks.length; i++) {
					if (newBooks[i].bookCollectionId === ids[1]) {
						newBooks[i].reservedFor = xhr.response.receivingUser;

						break;
					}
				}

				this.setState({ 
					successMessage: xhr.response.message,
					books: newBooks
				});
			} else {
				console.log(xhr.response);
			}
		});
	}

	markReceivedBook(event) {
		event.preventDefault();
		
		const ids = event.target.id.split('&');
		const formData = `userId=${ids[0]}&bookId=${ids[1]}`;

		Post.makePostRequest(formData, '/api/mark_received_book', true, (xhr) => {
			if (xhr.status === 200) {
				this.setState({
					acceptedTradeRequests: xhr.response.acceptedTradeRequests,
					successMessage: xhr.response.message
				});
			} else {
				console.log(xhr.response);
			}
		});
	}

	componentWillMount() {
		Post.makePostRequest(null, '/api/get_user_books', true, (xhr) => {
			if (xhr.status === 200) {
				this.setState({
					books: xhr.response.books,
					acceptedTradeRequests: xhr.response.acceptedTradeRequests
				});
			} else {
				console.log(xhr.response);
			}
		});
	}

	render() {
		if (!Auth.isUserAuthenticated()) {
			
			return (
				<Redirect to='/' />
			);

		} else {

			let bookList = [];
			let booksToSend = [];
			let booksYouWillReceive = [];

			if (this.state.books.length > 0 || this.state.acceptedTradeRequests.length > 0) {
				bookList = this.state.books.filter((book) => {
					return !book.reservedFor;
				}).map((book, index) => {
					return <MyBookRow key={index} bookCollectionId={book.bookCollectionId} handleAcceptRequest={(e) => this.handleAcceptRequest(e)} author={book.author} title={book.title} tradeRequests={book.tradeRequests} />;
				});

				booksToSend = this.state.books.filter((book) => {
					return book.reservedFor;
				}).map((book, index) => {
					return <MyBookToSendRow key={index} title={book.title} author={book.author} receivingUser={book.reservedFor} />;
				});

				if (this.state.acceptedTradeRequests.length > 0) {
					booksYouWillReceive = this.state.acceptedTradeRequests.map((tradeRequest, index) => {

						return <MyBookToReceiveRow key={index} username={tradeRequest.username} title={tradeRequest.title} author={tradeRequest.author} userId={tradeRequest.userId} city={tradeRequest.city} state={tradeRequest.state} markReceivedBook={(e) => this.markReceivedBook(e)} bookCollectionId={tradeRequest.bookCollectionId} />;
					})
				}

				
			} else {
				bookList = <Panel>{"You don't have any books available for trade. Why not enter a book?"}</Panel>
			}

			let successMessage = "";

			if (this.state.successMessage) {
				successMessage = React.createElement('div', { role: 'alert', className: 'alert alert-success' }, this.state.successMessage);
			}

			return (
				<div>
					{successMessage}
					<MyBooksForm errors={this.state.errors} onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleChange(e)} formBook={this.state.formBook} />
					{booksYouWillReceive.length > 0 ? <h3 className='page-header'>Books on the Way</h3> : ""}
					{booksYouWillReceive}
					{booksToSend.length > 0 ? <h3 className='page-header'>Books to Send</h3> : ""}
					{booksToSend}
					{bookList.length > 0 ? <h3 className='page-header'>Your Books</h3> : ""}
					{bookList}
				</div>
			)
		}
	}
}

export default MyBooksContainer;
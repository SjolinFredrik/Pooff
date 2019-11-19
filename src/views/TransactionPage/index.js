import React, {useEffect, useState} from 'react';
import { ArrowLeft } from 'react-feather'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Container, Button } from 'reactstrap';

const TransactionPage = () => {
console.log(useParams('id'))
  const [transaction, setTransaction] = useState(null);
  useEffect(() => {
    (async () => {
      // now ask  REST for the transaction with id = idToGet
      // const idToGet = useParams('id');
      // ...await result from REST, using fetch
      // then do
      // console.log('idToGet', idToGet);
      setTransaction({somethingFromDB: true});
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // const transactions = await fetch('/api/mytransactions')


  let transactionx = transaction.map((trans, i) => {
    // format date and remove punctuation
    let date = new Date(trans.date).toLocaleString('sv-SE', { day: "numeric", month: "short" })
    date = date.substring(0, date.length - 1);
    return (
      <Container className="transaction" key={'trans' + i} fluid={true}>
        <h2 className="page-title">Transaktion</h2>
        <Row className="no-gutters">
          <Col xs="12">
            <div className="card">
              <div className="card-body ">
                <p className="name"> {trans.receiver.firstName + ' ' + trans.receiver.lastName} </p>
                <p className="phone">{trans.receiver.phone}</p>
                <p className="amount"> {trans.amount}kr </p>
                <p className="message">" {trans.message} "</p>
                <p className="message">"{date}"</p>
              </div>
            </div>
          </Col>
        </Row>
        <div className="mt-3">
          <Link to="/mina-transaktioner">
            <Button className="back-btn"><ArrowLeft /></Button>
          </Link>
        </div>
      </Container>
    )
  })
  return transactionx

}

export default TransactionPage
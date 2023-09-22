'use client';
import Image from 'next/image';
import styles from './page.module.css'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type PayloadType = {
  payload: string;
  header: string;
}

export default function Home() {
  const [ decodedJwt, setDecodedJwt ] = useState<PayloadType | null>();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  
  const handleClick = ():void => {
    if(inputRef.current) {
      try {
        const [headerBase64, payloadBase64] = inputRef.current.value.split('.');
        const decodedHeader =  JSON.parse(Buffer.from(headerBase64, 'base64').toString());
        const decodedPayload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())

        setDecodedJwt({
          payload: decodedPayload,
          header: decodedHeader
        });
      } catch(error) {
        setDecodedJwt(null);
        inputRef.current.value = '';
        inputRef.current.classList.add('borda-vermelha');
        toast.error("Something went wrong in jwt decode");
      }
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.right_content}>
        <h1>JWT decode</h1>
        <textarea className={styles.textarea} ref={inputRef} name="" id="" cols={30} rows={10}></textarea>
        <div>
          <button onClick={handleClick} className={styles.btn}>
              Decode
          </button>
        </div>
      </div>
      {
        decodedJwt && (
          <div className={styles.left_content}>
            <div className={styles.decoded_content_item}>
              <p className={styles.decoded_header}>Payload:</p>
              <div className={styles.payload_container}>
                <pre className={styles.pre}>
                  {JSON.stringify(decodedJwt.payload, null, 2)}
                </pre>
              </div>
            </div>
            <div className={styles.decoded_content_item}>
              <p className={styles.decoded_header}>Header:</p>
              <div className={styles.payload_container}>
                <pre className={styles.pre}>
                  {JSON.stringify(decodedJwt.header, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )
      }
      <ToastContainer theme='dark'/>
      
    </main>
  )
}

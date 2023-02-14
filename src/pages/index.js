import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'

import useAxios from 'axios-hooks'
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';

import { Box } from '@material-ui/core'


function Catloading() {
  return (
    <>
    Loading...
    <Image width={250} height={250} src="https://i.giphy.com/media/ICOgUNjpvO0PC/giphy.webp" />
    </>
  )
}

export default function Home() {

  //   const stringtext = `
  // \nOkHttp is an open source Java library that enables developers to make efficient and reliable HTTP requests. It is a modern, efficient HTTP client for Android and Java applications. It supports HTTP/2, GZIP compression, and response caching to reduce network usage. It also supports request/response interception, customization, and logging.\n\nSample code:\n\n// Create an OkHttpClient instance\nOkHttpClient client = new OkHttpClient();\n\n// Create a request\nRequest request = new Request.Builder()\n    .url(\"https://www.example.com/\")\n    .build();\n\n// Execute the request\ntry (Response response = client.newCall(request).execute()) {\n    // Get the response body\n    String responseBody = response.body().string();\n    System.out.println(responseBody);\n} catch (IOException e) {\n    e.printStackTrace();\n}
  // `
  // const parts = stringtext.split('Sample code:')
  // const [explainText, codeText] = parts;

  const [language, setLanguage] = useState('Java');
  const [packageName, setPackage] = useState('okhttp')
  const [explanation, setExplanation] = useState('')
  const [codeSample, setCodeSample] = useState('')
  const [clicked, setClicked] = useState(false)


  const [
    { data: getData, loading: getLoading, error: putError },
    executeGet
  ] = useAxios(
    {
      url: `/api/query?lang=${language}&p=${packageName}`,
      method: 'GET'
    },
    { manual: true }
  )

  console.log({ language, packageName })

  function execGetData() {
    executeGet()
    setClicked(true)
  }

  useEffect(() => {
    if (getData) {
      const explanation = getData?.explanation
      const code = getData?.code;
      // const stringtext = choice.text;
      // const parts = stringtext.split('Sample code:')
      // const [explainText, codeText] = parts;
      setExplanation(explanation);
      setCodeSample(code)

    }
  }, [getData])

  console.log('>>>', getData)

  if (getLoading && clicked) return <Catloading />

  return (
    <>
      <Head>
        <title>What Does It Do?</title>
        <meta name="description" content="What does it do?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>WDID: What Does It Do?</h1>
        <Box sx={{ width: '250px' }} component="span" m={1}>
          <form noValidate autoComplete="off">
            <TextField onChange={(e) => setLanguage(e.target.value)} id="standard-basic" label="Language" />
            <TextField onChange={(e) => setPackage(e.target.value)} id="filled-basic" label="Package name" variant="filled" />
          </form>

          <Button onClick={execGetData} variant="contained">What does it do?</Button>


          {explanation && <h3>{explanation}</h3>}

          {codeSample && <>
            <h1>Sample code:</h1>
            <SyntaxHighlighter  >
              {codeSample}
            </SyntaxHighlighter>
          </>}

        </Box>


      </main>
    </>
  )
}

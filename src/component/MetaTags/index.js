import Head from "next/head";
import {useTranslation} from "next-i18next";

const MetaTags = ({
                      pageTitle,
                      metaTittle,
                      metaDes,
                      metaKeywords,
                      ogUrl,
                      ogTitle,
                      ogDes,
                      ogImage,
                      twCard,
                      twUrl,
                      twTitle,
                      twDes,
                      twImage,
                      canonical,
                      fbAppId
                  }) => {
    const {t: langTrans} = useTranslation();
    return <Head>
      <title>{`${pageTitle ? pageTitle + ' | Dummy' : 'Home | Dummy'}`}</title>


        <meta name="description" content={metaDes || "School management"}/>
        <meta name="keywords" content={metaKeywords || "Dummy"}/>
        <link rel="canonical" href={canonical || "https://web-dev.dummy.com"}/>
        <link rel="image_src" href="https://demo-demo.s3.amazonaws.com/logo/demoClassroomLogoWhite.svg"/>
        <meta property="og:title" content={ogTitle || 'Home'}/>
        <meta property="og:type" content="website"/>
        <meta property="og:description"
              content={ogDes || "School management"}/>
        <meta property="og:url" content={ogUrl || "web-dev.dummy.com"}/>
        <meta property="og:site_name" content="web-dev.dummy.com"/>
        <meta property="og:image"
              content={ogImage || "https://demo-demo.s3.amazonaws.com/logo/demoClassroomLogoWhite.svg"}/>
        <meta property="fb:app_id" content={fbAppId || "1609624482663670"}/>
        <meta name="DC.Publisher" content="demo"/>
        <link rel="author" href="plus.google.com/+demo"/>
        <meta property="twitter:card" content={twCard || "summary_large_image"}/>
        <meta property="twitter:url" content={twUrl || "https://web-dev.demo.com/"}/>
        <meta name="twitter:title" content={twTitle || "Home"}/>
        <meta name="twitter:description"
              content={twDes || "School management"}/>
        <meta property="twitter:image"
              content={twImage || "https://demo-demo.s3.amazonaws.com/logo/demoClassroomLogoWhite.svg"}/>
        {/* <meta name="twitter:site" content="@LaunchMyCareers"/>
        <meta name="twitter:creator" content="@LaunchMyCareers"/> */}
    </Head>
}

export default MetaTags;

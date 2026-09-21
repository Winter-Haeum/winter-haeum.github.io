/**
 * PrivacyPage — 개인정보처리방침 페이지
 *
 * URL: /privacy
 * 구성: Header + 방침 본문 + Footer
 *
 * Props: 없음
 */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

const EFFECTIVE_DATE = '2026년 9월 22일';

function SectionTitle({ children }) {
  return (
    <Typography
      variant='h2'
      sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, mt: 5, mb: 1.5 }}
    >
      {children}
    </Typography>
  );
}

function Paragraph({ children }) {
  return (
    <Typography
      variant='body2'
      sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 1.5 }}
    >
      {children}
    </Typography>
  );
}

function PrivacyPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box
        component='main'
        sx={{
          flex: 1,
          py: { xs: 5, md: 8 },
          px: 2,
        }}
      >
        <Container maxWidth='sm'>
          <Typography
            variant='h1'
            sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, mb: 1 }}
          >
            개인정보처리방침
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.disabled', mb: 3 }}>
            시행일: {EFFECTIVE_DATE}
          </Typography>

          <Paragraph>
            Winter Dev Archive(이하 &lsquo;사이트&rsquo;)는 개인 학습 아카이브이며, 운영자 Winter(겨울하음, 이하
            &lsquo;운영자&rsquo;)가 개인적으로 운영합니다. 이 방침은 사이트 이용 중 실제로 처리되는 정보의 범위와
            처리 방식을 안내합니다.
          </Paragraph>

          <SectionTitle>1. 수집하는 정보와 이용 목적</SectionTitle>
          <Paragraph>
            사이트는 방문자를 개별적으로 식별하는 정보를 수집하지 않습니다. 홈 화면 등에 표시되는 방문자 수는
            Supabase에 저장된 단일 집계 값(오늘 방문자 수, 누적 방문자 수)이며, 방문 시마다 이 숫자를 1씩
            증가시키는 방식으로만 동작합니다. 이름, 이메일, IP 주소, 기기 식별자 등 개별 방문자를 구분하거나
            추적할 수 있는 정보는 이 집계 과정에서 별도로 저장되지 않습니다.
          </Paragraph>
          <Paragraph>
            사이트를 실제로 호스팅하는 GitHub Pages와, 방문자 수 집계 API를 제공하는 Supabase는 서비스 제공을
            위해 필요한 기술적 접속 정보(예: 요청 IP)를 인프라 차원에서 일반적인 웹 서비스와 동일한 수준으로
            처리할 수 있습니다. 다만 이는 각 인프라 제공업체의 기본 운영 방식이며, 사이트 자체의 코드나
            데이터베이스에는 이러한 개별 접속 기록이 저장되거나 운영자가 조회할 수 있는 형태로 남지 않습니다.
          </Paragraph>

          <SectionTitle>2. 쿠키 및 브라우저 저장소</SectionTitle>
          <Paragraph>
            사이트는 쿠키(cookie)를 사용하지 않습니다. 대신 아래 기능을 위해 방문자의 브라우저 안에만
            저장되는 localStorage·sessionStorage를 사용하며, 이 정보는 운영자의 서버로 전송되지 않습니다.
          </Paragraph>
          <Paragraph>
            · 화면 테마(라이트/다크 모드) 선택 — localStorage에 저장되어 다음 방문 시에도 선택한 테마가
            유지됩니다.
            <br />
            · 문서별 학습 체크리스트 완료 상태 — 문서 단위로 localStorage에 저장되어 학습 진행 상황을 기억합니다.
            <br />
            · 방문자 수 중복 집계 방지 플래그 — 같은 브라우저 세션 안에서 여러 페이지를 이동해도 방문자 수가
            중복으로 올라가지 않도록 sessionStorage에 임시로 남기며, 브라우저 탭을 닫으면 사라집니다.
          </Paragraph>
          <Paragraph>
            이 정보들은 모두 방문자의 브라우저 안에만 존재하므로, 브라우저의 사이트 데이터·저장공간 삭제
            기능을 통해 이용자가 언제든지 직접 삭제할 수 있습니다.
          </Paragraph>

          <SectionTitle>3. 이용하는 외부 서비스</SectionTitle>
          <Paragraph>
            · GitHub Pages — 사이트 호스팅
            <br />
            · Supabase — 방문자 수 집계(위 1항의 단일 집계 값 저장) 용도로만 사용하며, 그 외 로그인, 결제,
            분석 등 다른 기능에는 사용하지 않습니다.
          </Paragraph>

          <SectionTitle>4. 광고에 관한 안내</SectionTitle>
          <Paragraph>
            이 사이트는 현재 광고를 게재하고 있지 않습니다. 향후 Google AdSense 등 광고 서비스를 도입할 경우,
            광고 제공업체가 쿠키 등을 이용해 이전 방문 이력을 바탕으로 한 맞춤형 광고를 게재할 수 있습니다.
            광고가 실제로 도입되는 시점에 이 방침을 개정하여 사용되는 쿠키의 종류와 목적, 이용자가 맞춤형
            광고를 조정하거나 거부할 수 있는 방법(예: Google 광고 설정, aboutads.info)을 미리 안내한 뒤
            적용합니다.
          </Paragraph>

          <SectionTitle>5. 정보의 보관과 삭제</SectionTitle>
          <Paragraph>
            방문자 수 집계 값은 개별 방문자를 특정할 수 없는 단순 합계 수치이므로, 개인 단위로 삭제를 요청할
            대상이 되는 정보가 없습니다. 이 수치는 사이트 운영 기간 동안 누적된 값으로 계속 유지됩니다.
            브라우저에 저장되는 정보(2항)는 이용자가 언제든 직접 삭제할 수 있습니다.
          </Paragraph>

          <SectionTitle>6. 문의</SectionTitle>
          <Paragraph>
            이 방침이나 사이트 운영에 관해 문의하실 사항이 있다면 아래 GitHub 프로필을 통해 연락해 주시기
            바랍니다. 현재 별도의 이메일이나 문의 양식은 운영하지 않습니다.
            <br />
            GitHub:{' '}
            <Box
              component='a'
              href='https://github.com/Winter-Haeum'
              target='_blank'
              rel='noopener noreferrer'
              sx={(theme) => ({ color: theme.palette.primary.main })}
            >
              https://github.com/Winter-Haeum
            </Box>
          </Paragraph>

          <SectionTitle>7. 방침의 개정</SectionTitle>
          <Paragraph>
            이 방침은 사이트 운영 방식이나 이용 서비스가 바뀌는 경우 개정될 수 있으며, 변경 시 이 페이지를
            통해 안내합니다.
          </Paragraph>

          <Divider sx={{ my: 4 }} />
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            <Box component={Link} to='/' sx={(theme) => ({ color: theme.palette.primary.main })}>
              아카이브로 돌아가기
            </Box>
          </Typography>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default PrivacyPage;

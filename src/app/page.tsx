
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { currentGameUser } from '@/common/lib/current-user';
import style from './page.module.scss';
import Link from '$/next/link';

export default function Home() {
  const { User } = currentGameUser();

  return (
    <div id={style.home}>
      <div className={style.title}>카드 뒤집기</div>
      <div className={style.btns}>
        <SignedOut>
          <Link href={"/sign-in"} className={style.btn}>로그인</Link>
          <Link href={"/game"} className={style.btn}>비회원</Link>
        </SignedOut>
        <SignedIn>
          <UserButton/>
          <Link href={"/game"} className={style.btn}>게임하기</Link>
        </SignedIn>
        <Link href={"/ranking"} className={style.btn}>랭킹</Link>
      </div>
    </div>
  );
}

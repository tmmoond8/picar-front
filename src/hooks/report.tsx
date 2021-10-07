import React from 'react';
import { toast } from 'react-toastify';
import { useModal } from '../components/Modal';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import Content from '../components/Content';
import { useStateRef } from '../hooks';
import { useStore } from '../stores';

export const useReport = ({ articleId }: { articleId?: number }) => {
  const modal = useModal();
  const { user } = useStore();
  const [reportContent, setReportContent, reportContentRef] =
    useStateRef<string>('불법정보 또는 불법 홍보물');

  const handleSubmit = async (commentId?: string) => {
    if (!articleId) {
      return;
    }
    try {
      await user.addReport(articleId, reportContentRef.current, commentId);
    } catch (error) {}
    modal.close();
    toast('신고가 접수되었습니다.');
  };

  const openReport = (commentId?: string) => {
    if (user.needLogin()) {
      return;
    }
    if (articleId) {
      modal.open({
        title: '게시글 신고',
        hasBottomCTA: true,
        contents: (
          <React.Fragment>
            <RadioButton
              options={[
                '불법정보 또는 불법 홍보물',
                '욕설 또는 인신공격',
                '음란물 또는 청소년에게 부적합한 내용',
                '반복 정보 게시 (도배글)',
                '기타',
              ]}
              defaultValue={reportContent}
              setValue={setReportContent}
            />
            <Button.BottomCTA
              onClick={() => {
                modal.close();
                handleSubmit();
              }}
              disabled={false}
            >
              제출
            </Button.BottomCTA>
          </React.Fragment>
        ),
      });
    }
  };

  const openCancelReport = (commentId?: string) => {
    if (articleId) {
      modal.open({
        title: '게시글 신고 취소',
        hasBottomCTA: true,
        contents: (
          <React.Fragment>
            <Content.Spacing size={16} />
            <p>{`${
              commentId ? 'ㅤㅤ댓글' : 'ㅤㅤ게시글'
            } 신고를 취소하시겠어요?`}</p>
            <Content.Spacing size={12} />
            <Button.BottomCTA
              onClick={() => {
                user.removeReport(articleId, commentId);
                toast('신고가 취소되었습니다.');
                modal.close();
              }}
              disabled={false}
            >
              신고 취소
            </Button.BottomCTA>
          </React.Fragment>
        ),
      });
    }
  };

  return {
    openReport,
    openCancelReport,
  };
};

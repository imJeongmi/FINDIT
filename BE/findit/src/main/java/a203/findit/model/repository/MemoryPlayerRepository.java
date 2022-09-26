package a203.findit.model.repository;

import a203.findit.model.dto.req.User.*;
import a203.findit.model.entity.Mode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@RequiredArgsConstructor
@Repository
public class MemoryPlayerRepository implements PlayerRepository {
    final private MemoryRoomRepository roomRepository;

    private PlayerInfoDTO findPlayerInfoDTO(String entercode, String sessionId){
        return roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().get(sessionId);
    }

    public PlayerInfoDTO save(PlayerEnterDTO playerEnterDTO, String sessionId){
        PlayerInfoDTO playerInfoDTO = new PlayerInfoDTO(playerEnterDTO);

        roomRepository.findByEnterCode(playerEnterDTO.getEntercode()).playerInfoDTOBySessionId.put(sessionId,playerInfoDTO);
        return playerInfoDTO;
    }

    /*
    게임 시작시 sessionIdByIGTID에 igtID key값 모두 생성하고 value 값 null로 설정하기
     */
    public void init(ArrayList<IGTDTO> igtdtos, String entercode){
        int len = igtdtos.size();
        for(int i=0;i<len;i++){
            roomRepository.findByEnterCode(entercode).getSessionIdByIGTID().put(igtdtos.get(i).getIndex(), null);
        }
    }

    /*
     igtid에서 같은 entercode 내에 igtid 의 emtpy 여부 / 개수 => 개수 리턴
     */
    public int igtidCnt(String entercode, int igtid){
        return roomRepository.findByEnterCode(entercode).getSessionIdByIGTID().get(igtid).size();
    }

    /*
     igtid에서 같은 entercode 내에 igtid와 sessionid가 같은게 있는지 확인 => bool
     */
    public boolean isExistSame(String entercode, int igtid, String sessionId){
        return roomRepository.findByEnterCode(entercode).getSessionIdByIGTID().get(igtid).contains(sessionId);
    }

    /*
    effect index 받아서 원래 스코어 + plusscore + effectscore
     */
    public int getFinalScore(int effectIndex, String entercode, String sessionId, int plusscore){
        int nowScore = roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().get(sessionId).getScore();
        int effectScore = 0;
        if (effectIndex == 0) effectScore = 10;
        else if(effectIndex == 1) effectScore = 20;
        else if(effectIndex == 2) effectScore = 30;
        else if(effectIndex == 3) effectScore = 40;
        else if(effectIndex == 4) effectScore = 50;
        else if(effectIndex == 5) effectScore = -10;
        else if(effectIndex == 6) effectScore = -20;
        else if(effectIndex == 7 ) effectScore = -30;
        else if(effectIndex == 8) effectScore = nowScore + plusscore;
        else if(effectIndex == 9){
            //exchange 점수 구현하기
        }
        return nowScore+plusscore+effectScore;
    }

    /*
    mode 가 뭔지 리턴
     */
    public Mode whatMode(String entercode){
        return roomRepository.findByEnterCode(entercode).getMode();
    }

    /*
    인메모리에 저장하기
    * */
    public void saveTreasure(BeforeFindDTO beforeFindDTO, String sessionId, AfterFindDTO afterFindDTO){
        roomRepository.findByEnterCode(beforeFindDTO.getEntercode()).getPlayerInfoDTOBySessionId().get(sessionId).setScore(afterFindDTO.getFinalscore());
        roomRepository.findByEnterCode(beforeFindDTO.getEntercode()).getSessionIdByIGTID().get(beforeFindDTO.getTreasureId()).add(sessionId);
    }

}

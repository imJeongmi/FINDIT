package a203.findit.model.repository;

import a203.findit.model.dto.req.User.*;
import a203.findit.model.entity.IGT;
import a203.findit.model.entity.Mode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.*;

@RequiredArgsConstructor
@Repository
public class MemoryPlayerRepository implements PlayerRepository {
    final private MemoryRoomRepository roomRepository;
    final private IGTRepository igtRepository;

    public PlayerInfoDTO findPlayerInfoDTO(String entercode, String sessionId){
        return roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().get(sessionId);
    }

    public PlayerInfoDTO save(PlayerEnterDTO playerEnterDTO, String sessionId){
        PlayerInfoDTO playerInfoDTO = new PlayerInfoDTO(playerEnterDTO,sessionId);
        //init
        roomRepository.findByEnterCode(playerEnterDTO.getEntercode()).getPlayerInfoDTOBySessionId().put(sessionId,playerInfoDTO);
        return playerInfoDTO;
    }

    /*
    igt db -> igtplayer inmemory
    게임 시작시 sessionIdByIGTID에 igtID key값 모두 생성하고 value 값 null로 설정하기
     */
    public void init(String entercode){
        Long roomId = roomRepository.findByEnterCode(entercode).getRoomId();
        for (IGT igt : igtRepository.findAllByGameId(roomId)) {
            roomRepository.findByEnterCode(entercode).getSessionIdByIGTID().put(igt.getTreasure().getId(), null);
        }
    }

    public void addIgtPlayer(String entercode, Long igtid, String sessionId){
        roomRepository.findByEnterCode(entercode).getSessionIdByIGTID().get(igtid).add(sessionId);
    }

    /*
     igtid에서 같은 entercode 내에 igtid 의 emtpy 여부 / 개수 => 개수 리턴
     */
    public int igtidCnt(String entercode, Long igtid){
        Set<String> sessions = roomRepository.findByEnterCode(entercode).getSessionIdByIGTID().get(igtid);
        if(sessions == null) return 0;
        else return sessions.size();
    }

    /*
     igtid에서 같은 entercode 내에 igtid와 sessionid가 같은게 있는지 확인 => bool
     */
    public boolean isExistSame(String entercode, Long igtid, String sessionId){
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
            //점수 exchange
            ArrayList<PlayerInfoDTO> playerRank = rankChange(entercode);
            int len = playerRank.size();
            for(int i=0;i<len;i++){
                PlayerInfoDTO playerInfoDTO = playerRank.get(i);
                if(playerInfoDTO.getSessionId().equals(sessionId)){
                    if(i==0){
                        return nowScore+plusscore;
                    }else{
                        PlayerInfoDTO befPlayerInfoDTO = playerRank.get(i-1);
                        int befScore = playerRank.get(i-1).getScore();
                        String befSessionId = befPlayerInfoDTO.getSessionId();
                        roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().get(befSessionId).setScore(nowScore+plusscore);
                        roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().get(sessionId).setScore(befScore);
                        return befScore;
                    }
                }
            }
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

    /*
    rank
     */
    public ArrayList<PlayerInfoDTO> rankChange(String entercode){

        HashMap<String, PlayerInfoDTO> rankInfo = new HashMap<>(roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId());

        ArrayList<PlayerInfoDTO> arr = new ArrayList<>();
        for(String session : rankInfo.keySet()){
            arr.add(rankInfo.get(session));
        }

        Collections.sort(arr, new Comparator<PlayerInfoDTO>() {
            @Override
            public int compare(PlayerInfoDTO o1, PlayerInfoDTO o2) {
                return o1.getScore() - o2.getScore();
            }
        });

        return arr;
    }

}

package a203.findit.model.repository;

import a203.findit.model.dto.req.User.*;
import a203.findit.model.entity.IGT;
import a203.findit.model.entity.Mode;
import a203.findit.model.entity.Player;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpSession;
import java.util.*;

@RequiredArgsConstructor
@Repository
public class MemoryPlayerRepository implements PlayerRepository {
    public static ArrayList<PlayerInfoDTO> playerInfoDTOSInMemory = new ArrayList<PlayerInfoDTO>();

    final private MemoryRoomRepository roomRepository;
    final private IGTRepository igtRepository;

    public PlayerInfoDTO findBySessionId(String sessionId){
        for(PlayerInfoDTO playerInfoDTO : playerInfoDTOSInMemory){
            if(playerInfoDTO.getSessionId().equals(sessionId)) return playerInfoDTO;
        }
        return new PlayerInfoDTO();
    }


    private PlayerInfoDTO findPlayerInfoDTO(String entercode, String sessionId){
        return roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().get(sessionId);
    }

    public PlayerInfoDTO save(PlayerEnterDTO playerEnterDTO, String sessionId){
        PlayerInfoDTO playerInfoDTO = new PlayerInfoDTO(playerEnterDTO,sessionId);
        //init
        roomRepository.findByEnterCode(playerEnterDTO.getEntercode()).getSessionIds().add(sessionId);
        roomRepository.findByEnterCode(playerEnterDTO.getEntercode()).getPlayerInfoDTOBySessionId().put(sessionId,playerInfoDTO);
        playerInfoDTOSInMemory.add(playerInfoDTO);
        //        System.out.println("nickname"+playerInfoDTO.getNickname());
//        System.out.println("profileImg"+playerInfoDTO.getProfileImg());
//        System.out.println(roomRepository.findByEnterCode(playerEnterDTO.getEntercode()).getPlayerInfoDTOBySessionId().get(sessionId).getNickname() + " " + roomRepository.findByEnterCode(playerEnterDTO.getEntercode()).getPlayerInfoDTOBySessionId().get(sessionId).getProfileImg());
        return playerInfoDTO;
    }

    public List<PlayerInfoDTO> getAllPlayers(String entercode){
        List<PlayerInfoDTO> playerInfoDTOS = new ArrayList<>();
        int len = roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().size();
        for(int i=0;i<len;i++){
            String si = roomRepository.findByEnterCode(entercode).getSessionIds().get(i);
            PlayerInfoDTO playerInfoDTO = roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().get(si);
            playerInfoDTOS.add(playerInfoDTO);
        }
        return playerInfoDTOS;
    }

    /*
    igt db -> igtplayer inmemory
    게임 시작시 sessionIdByIGTID에 igtID key값 모두 생성하고 value 값 null로 설정하기
     */
//    public void init(String entercode){
//        for (Long tid : roomRepository.findByEnterCode(entercode).getIgts()) {
//            roomRepository.findByEnterCode(entercode).getSessionIdByIGTID().put(tid,Collections.emptySet());
//        }
//    }

    /*
     igtid에서 같은 entercode 내에 igtid와 sessionid가 같은게 있는지 확인 => bool
     */
    public boolean isExistSame(String sessionId, Long igtid){
        if(findBySessionId(sessionId)==null) System.out.println("1wrong");
        if(findBySessionId(sessionId).getIGTIds()==null) System.out.println("2wrong");
        if(findBySessionId(sessionId).getIGTIds().isEmpty()) return false;
        for(Long id : findBySessionId(sessionId).getIGTIds()){
            if(id == igtid) return true;
        }
        return false;
    }

    public void addIgtPlayer( String sessionId, Long igtid){
        findBySessionId(sessionId).getIGTIds().add(igtid);
    }

    /*
     igtid에서 같은 entercode 내에 igtid 의 emtpy 여부 / 개수 => 개수 리턴
     */
    public int howManyPeopleFoundTid(Long igtid){
        int cnt=0;
        for(PlayerInfoDTO playerInfoDTO : playerInfoDTOSInMemory){
            for(Long tid : playerInfoDTO.getIGTIds()){
                if(tid == igtid) cnt++;
            }
        }
        return cnt;
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
        findBySessionId(sessionId).getIGTIds().add(beforeFindDTO.getTreasureId());
    }

    /*
    rank
     */
    public ArrayList<PlayerInfoDTO> rankChange(String entercode){

        ArrayList<PlayerInfoDTO> players = new ArrayList<>();

        for (PlayerInfoDTO playerInfoDTO : playerInfoDTOSInMemory){
            if(playerInfoDTO.getEntercode().equals(entercode)){
                players.add(playerInfoDTO);
            }
        }

        Collections.sort(players, new Comparator<PlayerInfoDTO>() {
            @Override
            public int compare(PlayerInfoDTO o1, PlayerInfoDTO o2) {
                return o2.getScore() - o1.getScore();
            }
        });

        int len = players.size();
        for(int i=0;i<len;i++){
            PlayerInfoDTO now = players.get(i);
            now.setRank(i+1);
            findBySessionId(now.getSessionId()).setRank(i+1);
        }
        return players;
    }

}

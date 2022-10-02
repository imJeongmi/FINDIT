package a203.findit.service;

import a203.findit.model.dto.req.User.AfterFindDTO;
import a203.findit.model.dto.req.User.BeforeFindDTO;
import a203.findit.model.dto.req.User.PlayerEnterDTO;
import a203.findit.model.dto.req.User.PlayerInfoDTO;
import a203.findit.model.entity.Mode;
import a203.findit.model.repository.MemoryPlayerRepository;
import a203.findit.model.repository.MemoryRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlayerServiceImpl implements PlayerService {
    final private MemoryPlayerRepository playerRepository;
    final private MemoryRoomRepository roomRepository;

    public void join(PlayerEnterDTO playerEnterDTO, String sessionId){
        playerRepository.save(playerEnterDTO,sessionId);
//        playerRepository.init(sessionId);
    }

    public List<PlayerInfoDTO> findAll(String entercode){
        return playerRepository.getAllPlayers(entercode);
    }

    public AfterFindDTO findTreasure(BeforeFindDTO beforeFindDTO, String sessionId){
        AfterFindDTO afterFindDTO = new AfterFindDTO();

        String entercode = beforeFindDTO.getEntercode();
        Long treasureId = beforeFindDTO.getTreasureId();
        int cnt = playerRepository.howManyPeopleFoundTid(treasureId);
        int plusscore = 50;
        if(playerRepository.isExistSame(sessionId, treasureId)) return new AfterFindDTO();
        else{
            playerRepository.addIgtPlayer(sessionId, treasureId);
            if(cnt==0){
                //100점
                plusscore =100;
            }
            else if(cnt==1){
                //80
                plusscore =80;
            }
            else if(cnt==2){
                //60
                plusscore =60;
            }
        }
        afterFindDTO.setPlusscore(plusscore);
        afterFindDTO.setRank(cnt+1);
        int effectIndex = -1;
        if(playerRepository.whatMode(entercode).equals(Mode.RANDOM)){
            effectIndex = ThreadLocalRandom.current().nextInt(0, 10); //0~9사이
        }
        afterFindDTO.setEffect(effectIndex);
        afterFindDTO.setFinalscore(playerRepository.getFinalScore(effectIndex, entercode,sessionId, plusscore));
        playerRepository.saveTreasure(beforeFindDTO,sessionId,afterFindDTO);
        return afterFindDTO;
    }

    public ArrayList<PlayerInfoDTO> rankChange(String entercode){
        return playerRepository.rankChange(entercode);
    }

    public boolean valid(String entercode){
        if (roomRepository.findByEnterCode(entercode) == null) return false;
        else return true;
    }
}

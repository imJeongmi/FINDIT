package a203.findit.model.repository;

import a203.findit.model.dto.req.User.RoomDTO;
import a203.findit.model.entity.Game;
import a203.findit.model.entity.Mode;
import a203.findit.model.repository.RoomRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Repository
public class MemoryRoomRepository implements RoomRepository {
    public static HashMap<String, RoomDTO> roomDTOHashMap = new HashMap<String, RoomDTO>();
    //entercode

    public String gameIdToCode(Long v, Long id) {
        String ret="";
        String time = Long.toString(v);
        String gid = Long.toString(id);

        int timeLen = time.length();
        while(gid.length() < 3){
            gid='0'+gid;
        }

        for(int i=0;i<3;i++) {
            String temp = String.valueOf(time.charAt(timeLen-i-1)) + String.valueOf(gid.charAt(i));
            ret+=temp;
        }

        return ret;
    }

    //구현 필요
    public String codeToGameId(String code){
        String id="";
        return id;
    }

    @Override
    public RoomDTO save(String entercode, Game game, Mode mode, int limitMinute){
        RoomDTO roomDTO = new RoomDTO(game);
        roomDTO.setMode(mode);
        roomDTO.setEnterCode(entercode);
        roomDTO.setLimitminute(limitMinute);
        roomDTOHashMap.put(entercode,roomDTO);
        return roomDTO;
    }

    public RoomDTO findByEnterCode(String entercode){
        return roomDTOHashMap.getOrDefault(entercode,null);
    }

}
